-- Update billing model from subscription to print-based

-- Create print orders table
CREATE TABLE print_orders (
  id SERIAL PRIMARY KEY,
  program_id INTEGER NOT NULL REFERENCES programs(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  team_id INTEGER REFERENCES teams(id),
  
  -- Order details
  quantity INTEGER NOT NULL DEFAULT 1,
  paper_type VARCHAR(50) DEFAULT 'standard', -- standard, premium, cardstock
  color_option VARCHAR(20) DEFAULT 'color', -- color, black_white
  folding_option VARCHAR(50) DEFAULT 'bifold', -- bifold, trifold, booklet
  
  -- Pricing
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) DEFAULT 0,
  shipping DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  
  -- Status
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  -- pending, payment_processing, paid, printing, shipped, delivered, cancelled
  
  -- Payment
  stripe_payment_intent_id VARCHAR(255),
  stripe_charge_id VARCHAR(255),
  paid_at TIMESTAMP,
  
  -- Fulfillment
  production_notes TEXT,
  tracking_number VARCHAR(100),
  shipped_at TIMESTAMP,
  delivered_at TIMESTAMP,
  
  -- Shipping address
  shipping_name VARCHAR(255),
  shipping_address_line1 VARCHAR(255),
  shipping_address_line2 VARCHAR(255),
  shipping_city VARCHAR(100),
  shipping_state VARCHAR(50),
  shipping_postal_code VARCHAR(20),
  shipping_country VARCHAR(2) DEFAULT 'US',
  shipping_phone VARCHAR(20),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create pricing tiers table
CREATE TABLE print_pricing (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  min_quantity INTEGER NOT NULL,
  max_quantity INTEGER,
  base_price_color DECIMAL(10, 2) NOT NULL,
  base_price_bw DECIMAL(10, 2) NOT NULL,
  paper_type VARCHAR(50) DEFAULT 'standard',
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default pricing tiers
INSERT INTO print_pricing (name, min_quantity, max_quantity, base_price_color, base_price_bw, paper_type) VALUES
('Single Copy', 1, 1, 15.00, 10.00, 'standard'),
('Small Batch', 2, 10, 12.00, 8.00, 'standard'),
('Medium Batch', 11, 25, 10.00, 6.50, 'standard'),
('Large Batch', 26, 50, 8.00, 5.00, 'standard'),
('Bulk Order', 51, NULL, 6.00, 4.00, 'standard'),
-- Premium paper options
('Premium Single', 1, 1, 25.00, 18.00, 'premium'),
('Premium Small', 2, 10, 20.00, 14.00, 'premium'),
('Premium Medium', 11, 25, 17.00, 11.00, 'premium'),
('Premium Large', 26, NULL, 14.00, 9.00, 'premium');

-- Create order status history
CREATE TABLE print_order_status_history (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES print_orders(id),
  status VARCHAR(50) NOT NULL,
  notes TEXT,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Update teams table to track print credits/allowances
ALTER TABLE teams
ADD COLUMN print_credits INTEGER DEFAULT 0,
ADD COLUMN print_credit_expires_at TIMESTAMP;

-- Create indexes for performance
CREATE INDEX idx_print_orders_user_id ON print_orders(user_id);
CREATE INDEX idx_print_orders_program_id ON print_orders(program_id);
CREATE INDEX idx_print_orders_status ON print_orders(status);
CREATE INDEX idx_print_orders_created_at ON print_orders(created_at);

-- Add print count to programs for analytics
ALTER TABLE programs
ADD COLUMN total_prints INTEGER DEFAULT 0,
ADD COLUMN last_printed_at TIMESTAMP;

-- Remove subscription-related columns from teams (optional - keep for migration period)
-- ALTER TABLE teams
-- DROP COLUMN stripe_subscription_id,
-- DROP COLUMN stripe_product_id,
-- DROP COLUMN plan_name,
-- DROP COLUMN subscription_status;