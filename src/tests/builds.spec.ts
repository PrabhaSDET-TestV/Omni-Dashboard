import { test, expect } from '@playwright/test';
import axios from 'axios';

const BASE_URL = process.env.BASE_URL!;
const PROJECT_ID = process.env.PROJECT_ID!;
const API_KEY = process.env.API_KEY!;

test.describe('Builds API', () => {
  let createdBuildId: string;

  test('Get Builds for a Project and validate project_id', async () => {
    const url = `${BASE_URL}/projects/${PROJECT_ID}/builds?days=7&environment=production`;

    try {
      const res = await axios.get(url, {
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Response:', res.data);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.data.builds)).toBe(true);

      for (const build of res.data.builds) {
        expect(build.project_id).toBe(PROJECT_ID);
      }
    } catch (error: any) {
      console.error('Axios error:', error.response?.status, error.response?.data);
      throw error;
    }
  });

  test('Start a new build', async ({ request }) => {
    const payload = {
      duration: 0,
      environment: 'production',
      status: 'in_progress'
    };

    const res = await request.post(`${BASE_URL}/projects/${PROJECT_ID}/builds?days=7&environment=production`, {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
      },
      data: payload
    });

    expect(res.status()).toBeGreaterThanOrEqual(200);
    const responseBody = await res.json();
    expect(responseBody).toHaveProperty('id');
    createdBuildId = responseBody.id;
  });

  test('Complete a build', async ({ request }) => {
    // If dynamic, ensure the ID was created
    expect(createdBuildId).toBeTruthy();

    const payload = {
      progress_status: 'completed',
      status: 'failed',
      duration: 800,
      environment: 'production'
    };

    const res = await request.patch(`${BASE_URL}/projects/${PROJECT_ID}/builds?build_id=${createdBuildId}`, {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
      },
      data: payload
    });

    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('failed');
  });
});
