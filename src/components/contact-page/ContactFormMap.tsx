"use client";

import React, { useState } from "react";
import { motion, Easing } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const fadeInUp = {
  hidden: { opacity: 0, y: 50, x: -50 },
  visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.6, ease: "easeOut" as Easing, delay: 0.2 } },
};

const ContactFormMap = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", formData);
      toast.success("Your message has been sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // URL-encoded address for Google Maps search
  const mapAddress = encodeURIComponent("No 4 crescent Street opposite Ace supermarket unity, Ilorin, Kwara State, Nigeria");
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapAddress}`;

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {/* Contact Form */}
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Send Us a Message
            </h2>
            <p className="text-muted-foreground mb-8">
              Have a question or need assistance? Fill out the form below and
              we'll get back to you as soon as possible.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Your Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Inquiry about an order"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" className="w-full rounded-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </motion.div>

          {/* Google Map */}
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Our Location
            </h2>
            <p className="text-muted-foreground mb-8">
              Visit us at our physical store or find us on the map below.
            </p>
            <div className="h-[400px] w-full overflow-hidden rounded-xl shadow-lg">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${mapAddress}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location"
              ></iframe>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View Larger Map
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactFormMap;