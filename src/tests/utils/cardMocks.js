// Test data for card components
export const mockMonsterCard = {
  id: 'test-1',
  name: 'Test Dragon',
  card_type: 'Monster',
  attribute: 'LIGHT',
  level: 8,
  monster_type: 'Dragon',
  card_subtype: 'Normal',
  atk: '3000',
  def: '2500',
  description: 'A test dragon for unit testing.',
  effect_text: null,
  image_url: 'https://example.com/test-dragon.jpg',
  card_code: 'TEST-001',
  isLegendary: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  created_by: 'test-user'
}

export const mockLegendaryCard = {
  ...mockMonsterCard,
  id: 'test-legendary',
  name: 'Blue-Eyes White Dragon',
  isLegendary: true,
  card_code: 'RD/KP01-JP000'
}

export const mockSpellCard = {
  id: 'test-spell',
  name: 'Test Spell',
  card_type: 'Spell',
  card_subtype: 'Normal',
  description: 'A test spell card.',
  effect_text: 'Draw 2 cards.',
  image_url: 'https://example.com/test-spell.jpg',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  created_by: 'test-user'
}

export const mockTrapCard = {
  id: 'test-trap',
  name: 'Test Trap',
  card_type: 'Trap',
  card_subtype: 'Normal',
  description: 'A test trap card.',
  effect_text: 'Negate the activation of a Spell Card.',
  image_url: 'https://example.com/test-trap.jpg',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  created_by: 'test-user'
}