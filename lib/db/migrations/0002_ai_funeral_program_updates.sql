-- Add AI-related columns to programs table
ALTER TABLE programs 
ADD COLUMN loved_one_story TEXT,
ADD COLUMN ai_generated_obituary TEXT,
ADD COLUMN obituary_tone VARCHAR(20) DEFAULT 'warm',
ADD COLUMN obituary_length VARCHAR(20) DEFAULT 'medium',
ADD COLUMN life_highlights TEXT,
ADD COLUMN template_category VARCHAR(50),
ADD COLUMN last_auto_save TIMESTAMP;

-- Update program_timeline table to support new event types
ALTER TABLE program_timeline
ADD COLUMN type VARCHAR(50) NOT NULL DEFAULT 'custom',
ADD COLUMN performer VARCHAR(255),
ADD COLUMN duration INTEGER,
ADD COLUMN notes TEXT;

-- Remove old participants column if it exists
ALTER TABLE program_timeline
DROP COLUMN IF EXISTS participants;

-- Create indexes for better performance
CREATE INDEX idx_programs_user_id ON programs(user_id);
CREATE INDEX idx_programs_is_draft ON programs(is_draft);
CREATE INDEX idx_program_timeline_program_id ON program_timeline(program_id);
CREATE INDEX idx_program_timeline_sort_order ON program_timeline(program_id, sort_order);

-- Add template metadata table for storing template information
CREATE TABLE IF NOT EXISTS program_templates (
  id SERIAL PRIMARY KEY,
  template_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT,
  tags TEXT[], -- Array of tags
  is_premium BOOLEAN DEFAULT FALSE,
  colors TEXT[], -- Array of hex colors
  heading_font VARCHAR(100),
  body_font VARCHAR(100),
  preview_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default templates
INSERT INTO program_templates (template_id, name, category, description, tags, colors, heading_font, body_font) VALUES
('eternal-grace', 'Eternal Grace', 'traditional', 'Classic design with gold foil accents and elegant serif typography', ARRAY['classic', 'elegant', 'formal'], ARRAY['#D4AF37', '#1A1A1A', '#FDFBF7'], 'Playfair Display', 'Crimson Text'),
('peaceful-journey', 'Peaceful Journey', 'traditional', 'Serene design with soft blue tones and dove imagery', ARRAY['peaceful', 'religious', 'comforting'], ARRAY['#4A7C7E', '#F0F4F8', '#E8D5C4'], 'Cormorant Garamond', 'Lora'),
('celebration-life', 'Celebration of Life', 'modern', 'Vibrant, uplifting design celebrating a life well-lived', ARRAY['celebration', 'colorful', 'modern'], ARRAY['#FF6B6B', '#4ECDC4', '#FFE66D'], 'Montserrat', 'Open Sans'),
('minimal-memory', 'Minimal Memory', 'modern', 'Clean, contemporary design with focus on photography', ARRAY['minimal', 'photo-focused', 'clean'], ARRAY['#000000', '#FFFFFF', '#F5F5F5'], 'Helvetica Neue', 'Inter'),
('garden-remembrance', 'Garden Remembrance', 'nature', 'Beautiful floral design with roses and garden imagery', ARRAY['floral', 'garden', 'feminine'], ARRAY['#F8B195', '#F67280', '#C06C84'], 'Playfair Display', 'Crimson Pro'),
('sunset-farewell', 'Sunset Farewell', 'nature', 'Warm sunset theme symbolizing peaceful transition', ARRAY['sunset', 'warm', 'peaceful'], ARRAY['#FF6B35', '#F7931E', '#FCEE21'], 'Merriweather', 'Lato'),
('honor-valor', 'Honor & Valor', 'patriotic', 'Military honors template with flag and eagle imagery', ARRAY['military', 'patriotic', 'veteran'], ARRAY['#002868', '#BF0A30', '#FFFFFF'], 'Oswald', 'Roboto');