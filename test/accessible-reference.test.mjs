import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../src/accessible.jsx', import.meta.url), 'utf8');
const page = await readFile(new URL('../accessible.html', import.meta.url), 'utf8');

test('accessible reference keeps the expected semantic accessibility hooks', () => {
  assert.ok(page.includes('lang="en"'));
  for (const required of ['Skip to main content', 'role="status"', 'aria-live="polite"', 'aria-modal="true"', 'aria-labelledby="invite-heading"', 'htmlFor={taskId}', 'alt="A person working at a laptop by a bright window"']) {
    assert.ok(source.includes(required), `expected ${required}`);
  }
  assert.ok(!source.includes('aria-describedby="missing-description"'));
});
