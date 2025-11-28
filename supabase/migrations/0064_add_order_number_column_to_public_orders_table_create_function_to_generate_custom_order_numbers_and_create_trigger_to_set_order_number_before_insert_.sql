-- Add the new order_number column to the public.orders table
ALTER TABLE public.orders
ADD COLUMN order_number TEXT UNIQUE;

-- Create a function to generate the custom order number
CREATE OR REPLACE FUNCTION public.generate_custom_order_number()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
DECLARE
    new_order_num TEXT;
    current_date_prefix TEXT;
    random_digits TEXT;
    is_unique BOOLEAN;
BEGIN
    -- Format current date as YY.MM.DD
    current_date_prefix := TO_CHAR(NOW(), 'YY.MM.DD');

    LOOP
        -- Generate five random digits, padded with leading zeros
        random_digits := LPAD(FLOOR(RANDOM() * 100000)::TEXT, 5, '0');
        -- Combine prefix, date, and random digits
        new_order_num := 'UE-' || current_date_prefix || '-' || random_digits;

        -- Check if the generated order number is unique
        SELECT NOT EXISTS (SELECT 1 FROM public.orders WHERE order_number = new_order_num) INTO is_unique;

        IF is_unique THEN
            -- If unique, assign it to the new order_number column and exit loop
            NEW.order_number := new_order_num;
            EXIT;
        END IF;
        -- If not unique, the loop will continue to generate another random_digits
    END LOOP;

    RETURN NEW;
END;
$$;

-- Create a trigger to call the function before inserting a new row into public.orders
CREATE TRIGGER set_custom_order_number
BEFORE INSERT ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.generate_custom_order_number();