"use client";

import React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";

const CTASection = () => {
    const { signIn, isLoaded, setActive } = useSignIn();
    const router = useRouter();

    const handleDemoLogin = async () => {
        if (!isLoaded) return;

        try {
            const result = await signIn.create({
                identifier: "dehet67222@nyfhk.com",
                password: "smartspendpassword",
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                window.location.href = "/dashboard";
            } else {
                console.error(result);
            }
        } catch (err) {
            console.error("Error:", err);
            toast.error("Failed to login to demo account");
        }
    };

    return (
        <section className="py-20 bg-[#93BFC7]">
            <div className="container mx-auto text-center px-4">
                <h2 className="text-3xl font-bold text-white mb-4">
                    Ready to Take Control of Your Finances?
                </h2>
                <p className="text-white mb-8 max-w-2xl mx-auto">
                    Join thousands of users who are already managing their finances smarter
                    with SmartSpend.
                </p>
                <Button
                    size="lg"
                    onClick={handleDemoLogin}
                    className="bg-white text-[#93BFC7] hover:bg-blue-50 animate-bounce cursor-pointer"
                >
                    Start Free Demo
                </Button>
            </div>
        </section>
    );
};

export default CTASection;
