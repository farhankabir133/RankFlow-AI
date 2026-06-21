import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock global fetch if needed in unit tests
global.fetch = vi.fn();
