"use client";
import React, { useState, useRef } from "react";
import { ArrowRight, Info } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("idle");
  const formRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const message = formData.get("message");

    if (!name.trim() || !message.trim()) {
      setStatus("error");
      setResult("Please enter a valid name and message.");
      return;
    }

    setStatus("sending");
    setResult("");

    formData.append("access_key", "15fc64f4-d159-4752-a9b8-2b6bf58f5059");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setResult("Message received — I'll get back to you soon.");
        e.target.reset();

        setTimeout(() => {
          setStatus("idle");
          setResult("");
        }, 4000);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setStatus("error");
      setResult(err.message || "Something went wrong.");
    }
  };

  const fieldClass =
    "w-full p-4 text-sm outline-none rounded-xl border transition-all duration-300 " +
    "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 " +
    "text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 " +
    "focus:border-violet-500 dark:focus:border-violet-400 focus:ring-4 focus:ring-violet-500/5 " +
    "focus:-translate-y-px shadow-sm";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      id="contact"
      className="w-full px-[12%] py-20 scroll-mt-20"
    >
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-xs tracking-[4px] uppercase text-gray-500 dark:text-white/50 mb-2"
        >
          Get in touch
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl font-ovo dark:text-white"
        >
          Let&apos;s work together
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-2xl mx-auto p-[1px] rounded-3xl overflow-hidden group shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-emerald-400 to-violet-500 bg-size-200 animate-border-flow opacity-20 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative bg-white dark:bg-[#13111e] rounded-[calc(1.5rem-1px)] p-8 md:p-12">
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="relative z-10 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest font-semibold text-gray-400">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Zayd"
                  required
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest font-semibold text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="zayd@example.com"
                  required
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-widest font-semibold text-gray-400">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell me about your project..."
                required
                className={fieldClass}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    formRef.current.requestSubmit();
                  }
                }}
              />
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4 pt-4">
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <Info className="w-3.5 h-3.5" />
                Reply within 24 hours
              </span>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2.5 px-10 py-4 rounded-full text-sm font-bold transition-all duration-500
                  ${status === "success" ? "bg-emerald-600 text-white" : "bg-gray-900 dark:bg-white text-white dark:text-gray-900"}
                  disabled:opacity-50 shadow-xl`}
              >
                {status === "sending" ? (
                  <span className="flex gap-1">
                    {[0, 0.2, 0.4].map((d, i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-current"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, delay: d }}
                      />
                    ))}
                  </span>
                ) : status === "success" ? (
                  "Sent!"
                ) : (
                  <>
                    Send Message <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>

            {result && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center text-sm font-medium ${status === "success" ? "text-emerald-500" : "text-red-500"}`}
              >
                {result}
              </motion.p>
            )}
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
