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

  test('Start a new build', async () => {
    const url = `${BASE_URL}/projects/${PROJECT_ID}/builds?days=7&environment=production`;

    try {
      const payload = {
        duration: 0,
        environment: 'production',
        status: 'in_progress'
      };

      const res = await axios.post(url, payload, {
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Start Build Response:', res.data);

      expect(res.status).toBe(201);
      expect(res.data).toHaveProperty('id');

      createdBuildId = res.data.id;
    } catch (error: any) {
      console.error('Axios error:', error.response?.status, error.response?.data);
      throw error;
    }
  });

  test('Complete a build', async () => {
    expect(createdBuildId).toBeTruthy();

    const url = `${BASE_URL}/projects/${PROJECT_ID}/builds?build_id=${createdBuildId}`;

    const payload = {
      progress_status: 'completed',
      status: 'failed',
      duration: 800,
      environment: 'production'
    };

    try {
      const res = await axios.patch(url, payload, {
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Complete Build Response:', res.data);

      expect(res.status).toBe(200);
      expect(res.data.status).toBe('failed');
      expect(res.data.progress_status).toBe('completed');
    } catch (error: any) {
      console.error('Axios error:', error.response?.status, error.response?.data);
      throw error;
    }
  });
});
