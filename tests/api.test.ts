import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

const BASE_URL = 'http://localhost:3000';

describe('GARAM Constructores - API & Security Hardening Tests', () => {

  test('GET /api/health should return status healthy and server metrics', async () => {
    const res = await fetch(`${BASE_URL}/api/health`);
    assert.equal(res.status, 200);

    const data = await res.json();
    assert.equal(data.status, 'healthy');
    assert.equal(data.service, 'GARAM Constructores API');
    assert.ok(typeof data.uptimeSeconds === 'number');
    assert.ok(typeof data.metrics?.memoryRssMb === 'number');
    assert.ok(typeof data.metrics?.persistedLeadsCount === 'number');
  });

  test('HTTP Response Headers must contain security headers', async () => {
    const res = await fetch(`${BASE_URL}/api/health`);
    assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(res.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
    assert.equal(res.headers.get('x-xss-protection'), '1; mode=block');
  });

  test('GET /api/portfolio/data must return all 11 curated projects', async () => {
    const res = await fetch(`${BASE_URL}/api/portfolio/data`);
    assert.equal(res.status, 200);

    const data = await res.json();
    assert.ok(Array.isArray(data.projects));
    assert.equal(data.projects.length, 11);
    
    // Check Project 01 (Casa 33) and Project 02 (Casa AM)
    const casa33 = data.projects.find((p: any) => p.id === 'casa-33');
    const casaAm = data.projects.find((p: any) => p.id === 'casa-am');

    assert.ok(casa33, 'Casa 33 must exist');
    assert.ok(casaAm, 'Casa AM must exist');
    assert.equal(casaAm.number, '02');
    assert.ok(casaAm.gallery.length >= 4, 'Casa AM must have photos in gallery');
  });

  test('POST /api/estimate must reject requests without contact info', async () => {
    const res = await fetch(`${BASE_URL}/api/estimate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Sin Contacto' }),
    });

    assert.equal(res.status, 400);
    const data = await res.json();
    assert.ok(data.error.includes('canal de contacto'));
  });

  test('POST /api/estimate should register valid inquiry with reference ticket', async () => {
    const res = await fetch(`${BASE_URL}/api/estimate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Arq. Valentina Mendoza',
        email: 'vmendoza@estudio-vm.com',
        phone: '+584120001122',
        service: 'Construcción Residencial de Lujo',
        area: '1.500 m²',
        location: 'La Castellana',
      }),
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.referenceId.startsWith('GARAM-'));
  });

  test('POST /api/save-slide-image must block path traversal attempts', async () => {
    const res = await fetch(`${BASE_URL}/api/save-slide-image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slideNumber: '../../etc/passwd',
        dataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==',
      }),
    });

    assert.equal(res.status, 400);
    const data = await res.json();
    assert.ok(data.error.includes('entero válido'));
  });

  test('GET /api/leads/export must support CSV and JSON outputs', async () => {
    const jsonRes = await fetch(`${BASE_URL}/api/leads/export?format=json`);
    assert.equal(jsonRes.status, 200);
    const jsonData = await jsonRes.json();
    assert.ok(Array.isArray(jsonData.leads));

    const csvRes = await fetch(`${BASE_URL}/api/leads/export?format=csv`);
    assert.equal(csvRes.status, 200);
    assert.ok(csvRes.headers.get('content-type')?.includes('text/csv'));
    const csvText = await csvRes.text();
    assert.ok(csvText.startsWith('referenceId,timestamp,name'));
  });
});
