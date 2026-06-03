"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  projectType: z.enum(["kitchen", "bathroom", "living", "office", "full_home", "other"]),
  message: z.string().min(20, "Message must be at least 20 characters"),
  budget: z.string().min(1, "Please select a budget range"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="text-center py-12">
        <h3 className="font-display italic text-2xl text-charcoal">Thank you!</h3>
        <p className="mt-3 text-warm-500">
          We&apos;ve received your message and will be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="font-display italic text-display-md text-charcoal mb-2">
        Send us a message
      </h2>

      {/* Name */}
      <div>
        <label className="block text-sm text-warm-600 mb-1.5">Name *</label>
        <input
          {...register("name")}
          className={cn(
            "w-full px-4 py-3 bg-warm-100 border rounded-sm text-charcoal placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-shadow",
            errors.name ? "border-red-400" : "border-warm-200"
          )}
          placeholder="Your full name"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm text-warm-600 mb-1.5">Email *</label>
        <input
          {...register("email")}
          type="email"
          className={cn(
            "w-full px-4 py-3 bg-warm-100 border rounded-sm text-charcoal placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-shadow",
            errors.email ? "border-red-400" : "border-warm-200"
          )}
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm text-warm-600 mb-1.5">Phone</label>
        <input
          {...register("phone")}
          type="tel"
          className="w-full px-4 py-3 bg-warm-100 border border-warm-200 rounded-sm text-charcoal placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-shadow"
          placeholder="(905) 608-0632"
        />
      </div>

      {/* Project Type */}
      <div>
        <label className="block text-sm text-warm-600 mb-1.5">Project Type *</label>
        <select
          {...register("projectType")}
          className={cn(
            "w-full px-4 py-3 bg-warm-100 border rounded-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold-400 transition-shadow",
            errors.projectType ? "border-red-400" : "border-warm-200"
          )}
        >
          <option value="">Select a project type</option>
          <option value="kitchen">Kitchen</option>
          <option value="bathroom">Bathroom</option>
          <option value="living">Living Area</option>
          <option value="office">Office</option>
          <option value="full_home">Full Home</option>
          <option value="other">Other</option>
        </select>
        {errors.projectType && (
          <p className="text-red-500 text-xs mt-1">{errors.projectType.message}</p>
        )}
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm text-warm-600 mb-1.5">Budget Range *</label>
        <select
          {...register("budget")}
          className={cn(
            "w-full px-4 py-3 bg-warm-100 border rounded-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold-400 transition-shadow",
            errors.budget ? "border-red-400" : "border-warm-200"
          )}
        >
          <option value="">Select your budget</option>
          <option value="under_10k">Under $10k</option>
          <option value="10k_25k">$10k – $25k</option>
          <option value="25k_50k">$25k – $50k</option>
          <option value="50k_plus">$50k+</option>
        </select>
        {errors.budget && (
          <p className="text-red-500 text-xs mt-1">{errors.budget.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm text-warm-600 mb-1.5">Message *</label>
        <textarea
          {...register("message")}
          rows={5}
          className={cn(
            "w-full px-4 py-3 bg-warm-100 border rounded-sm text-charcoal placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-shadow resize-none",
            errors.message ? "border-red-400" : "border-warm-200"
          )}
          placeholder="Tell us about your project..."
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3.5 bg-charcoal text-warm-50 rounded-sm hover:bg-gold-400 hover:text-charcoal transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "error" && (
        <p className="text-red-500 text-sm text-center">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
