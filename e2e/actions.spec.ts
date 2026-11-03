import { expect, test } from '@playwright/test';
import { getFeatureData } from '../actions/Features';
import { getMenuData } from '../actions/Menu';
import { getTestimonialData } from '../actions/Testimonials';
import {
  FEATURES_DATA,
  MENU_DATA,
  TESTIMONIALS_DATA,
} from '../data/static';

test('feature action returns the feature data', async () => {
  // Arrange
  const expectedData = FEATURES_DATA;

  // Act
  const result = await getFeatureData();

  // Assert
  expect(result).toEqual({ success: true, data: expectedData });
});

test('menu action returns the menu data', async () => {
  // Arrange
  const expectedData = MENU_DATA;

  // Act
  const result = await getMenuData();

  // Assert
  expect(result).toEqual({ success: true, data: expectedData });
});

test('testimonial action returns the testimonial data', async () => {
  // Arrange
  const expectedData = TESTIMONIALS_DATA;

  // Act
  const result = await getTestimonialData();

  // Assert
  expect(result).toEqual({ success: true, data: expectedData });
});
