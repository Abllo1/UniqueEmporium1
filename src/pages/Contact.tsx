"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg text-muted-foreground mb-8">
        We'd love to hear from you! Reach out to us through any of the methods below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
        <div className="flex flex-col items-center p-6 border rounded-lg shadow-sm">
          <Mail className="h-10 w-10 text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Email Us</h2>
          <p className="text-muted-foreground">support@electropro.com</p>
          <p className="text-sm text-muted-foreground">We typically respond within 24 hours.</p>
        </div>

        <div className="flex flex-col items-center p-6 border rounded-lg shadow-sm">
          <Phone className="h-10 w-10 text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Call Us</h2>
          <p className="text-muted-foreground">+1 (555) 123-4567</p>
          <p className="text-sm text-muted-foreground">Mon-Fri, 9 AM - 5 PM EST</p>
        </div>

        <div className="flex flex-col items-center p-6 border rounded-lg shadow-sm">
          <MapPin className="h-10 w-10 text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Visit Us</h2>
          <p className="text-muted-foreground">123 Tech Avenue, Innovation City, TX 78701</p>
          <p className="text-sm text-muted-foreground">By appointment only.</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;