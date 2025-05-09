"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, ReactNode, useCallback, useMemo } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
    children,
    className,
    containerClassName,
    colors,
    waveWidth,
    blur = 0,
    speed = "fast",
    waveOpacity = 0.5,
    ...props
}: {
    children?: ReactNode;
    className?: string;
    containerClassName?: string;
    colors?: string[];
    waveWidth?: number;
    blur?: number;
    speed?: "slow" | "fast";
    waveOpacity?: number;
    [key: string]: unknown;
}) => {
    const noise = createNoise3D(() => Math.random());
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationIdRef = useRef<number | undefined>(undefined);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const dimensionsRef = useRef({ w: 0, h: 0, nt: 0 });

    const waveColors = useMemo(() => colors ?? [
        "#fff",
        "#818cf8",
        "#c084fc",
        "#e879f9",
        "#22d3ee",
    ], [colors]);

    const getSpeed = useCallback(() => {
        switch (speed) {
            case "slow":
                return 0.001;
            case "fast":
                return 0.002;
            default:
                return 0.001;
        }
    }, [speed]);

    const drawWave = useCallback((n: number) => {
        const ctx = ctxRef.current;
        if (!ctx) return;
        dimensionsRef.current.nt += getSpeed();
        ctx.clearRect(0, 0, dimensionsRef.current.w, dimensionsRef.current.h);

        for (let i = 0; i < n; i++) {
            ctx.beginPath();
            ctx.lineWidth = waveWidth || 50;
            ctx.strokeStyle = waveColors[i % waveColors.length];
            ctx.globalAlpha = waveOpacity || 0.5;

            for (let x = 0; x < dimensionsRef.current.w; x += 5) {
                const y = noise(x / 800, 0.3 * i, dimensionsRef.current.nt) * 100;
                ctx.lineTo(x, y + dimensionsRef.current.h * 0.5);
            }

            ctx.stroke();
            ctx.closePath();
        }
    }, [getSpeed, waveWidth, waveColors, waveOpacity, noise]);

    const render = useCallback(() => {
        drawWave(5);
        animationIdRef.current = requestAnimationFrame(render);
    }, [drawWave]);

    const init = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctxRef.current = ctx;
        dimensionsRef.current.w = ctx.canvas.width = window.innerWidth;
        dimensionsRef.current.h = ctx.canvas.height = window.innerHeight;
        ctx.filter = `blur(${blur}px)`;
        dimensionsRef.current.nt = 0;

        window.onresize = function () {
            if (!ctxRef.current || !canvas) return;
            dimensionsRef.current.w = ctxRef.current.canvas.width = window.innerWidth;
            dimensionsRef.current.h = ctxRef.current.canvas.height = window.innerHeight;
            ctxRef.current.filter = `blur(${blur}px)`;
        };

        render();
    }, [blur, render]);

    useEffect(() => {
        init();
        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, [init]);

    const [isSafari, setIsSafari] = useState(false);
    useEffect(() => {
        setIsSafari(
            typeof window !== "undefined" &&
            navigator.userAgent.includes("Safari") &&
            !navigator.userAgent.includes("Chrome")
        );
    }, []);

    return (
        <div
            className={cn(
                "h-[20em] w-[98%] flex flex-col items-center justify-center",
                containerClassName
            )}
        >
            <canvas
                className="absolute -z-10"
                ref={canvasRef}
                id="canvas"
                style={{
                    ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
                    backgroundColor: 'transparent'
                }}
            ></canvas>
            <div className={cn("relative z-10", className)} {...props}>
                {children}
            </div>
        </div>
    );
};