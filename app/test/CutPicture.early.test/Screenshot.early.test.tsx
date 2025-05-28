import React from "react"; // CutPicture.test.tsx

import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import html2canvas from "html2canvas";
import CutPicture from "./CutPicture";

// CutPicture.test.tsx
// Mocks for next/image and next/link
jest.mock("next/image", () => (props: any) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} />;
});
jest.mock("next/link", () => {
  return ({ href, children }: any) => <a href={href}>{children}</a>;
});

// Mock for html2canvas
jest.mock("html2canvas", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock for test image import
jest.mock("../../test/test.jpg", () => "test.jpg");

describe("Screenshot() Screenshot method", () => {
  // Happy Paths
  describe("Happy paths", () => {
    beforeEach(() => {
      // Reset mocks before each test
      (html2canvas as jest.Mock).mockReset();
    });

    it("renders the component with image, button, and link", () => {
      // This test ensures the component renders all main elements
      render(<CutPicture />);
      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /chụp và xử lý ảnh/i })
      ).toBeInTheDocument();
      expect(screen.getByRole("link")).toBeInTheDocument();
    });

    it("captures screenshot and displays the captured image", async () => {
      // This test simulates clicking the button and checks if the captured image is displayed
      const fakeDataUrl = "data:image/png;base64,fakeimage";
      const fakeCanvas = {
        toDataURL: () => fakeDataUrl,
      };
      (html2canvas as jest.Mock).mockResolvedValue(fakeCanvas);

      render(<CutPicture />);
      const button = screen.getByRole("button", { name: /chụp và xử lý ảnh/i });

      fireEvent.click(button);

      // Wait for the captured image to appear
      await waitFor(() => {
        expect(screen.getByText("Ảnh đã chụp:")).toBeInTheDocument();
        expect(screen.getByAltText("Captured")).toHaveAttribute(
          "src",
          fakeDataUrl
        );
      });

      // The link should now have the data url as href and text
      expect(screen.getByRole("link")).toHaveAttribute("href", fakeDataUrl);
      expect(screen.getByRole("link")).toHaveTextContent(fakeDataUrl);
    });

    it("does not display captured image before button is clicked", () => {
      // This test ensures the captured image section is not present initially
      render(<CutPicture />);
      expect(screen.queryByText("Ảnh đã chụp:")).not.toBeInTheDocument();
      expect(screen.queryByAltText("Captured")).not.toBeInTheDocument();
    });
  });

  // Edge Cases
  describe("Edge cases", () => {
    beforeEach(() => {
      (html2canvas as jest.Mock).mockReset();
    });

    it("does not throw or update state if captureRef.current is not set", async () => {
      // This test simulates the case where the ref is not attached (should do nothing)
      // To simulate this, we need to render the component and forcibly set captureRef.current to undefined
      // Since we cannot access the ref directly, we can simulate by mocking html2canvas to throw if called
      (html2canvas as jest.Mock).mockImplementation(() => {
        throw new Error("Should not be called");
      });

      render(<CutPicture />);
      // Remove the div with ref from the DOM to simulate ref.current being undefined
      const div = screen.getByRole("img").parentElement;
      if (div && div.parentElement) {
        div.parentElement.removeChild(div);
      }

      const button = screen.getByRole("button", { name: /chụp và xử lý ảnh/i });
      fireEvent.click(button);

      // Wait a tick to ensure nothing happens
      await waitFor(() => {
        expect(screen.queryByText("Ảnh đã chụp:")).not.toBeInTheDocument();
        expect(screen.queryByAltText("Captured")).not.toBeInTheDocument();
      });
    });

    it("handles html2canvas rejection gracefully", async () => {
      // This test simulates html2canvas throwing an error
      (html2canvas as jest.Mock).mockRejectedValue(
        new Error("html2canvas failed")
      );

      render(<CutPicture />);
      const button = screen.getByRole("button", { name: /chụp và xử lý ảnh/i });

      fireEvent.click(button);

      // Wait to ensure no captured image is shown and no crash
      await waitFor(() => {
        expect(screen.queryByText("Ảnh đã chụp:")).not.toBeInTheDocument();
        expect(screen.queryByAltText("Captured")).not.toBeInTheDocument();
      });
    });

    it("handles html2canvas returning a canvas with empty data url", async () => {
      // This test simulates html2canvas returning a canvas with empty data url
      const fakeCanvas = {
        toDataURL: () => "",
      };
      (html2canvas as jest.Mock).mockResolvedValue(fakeCanvas);

      render(<CutPicture />);
      const button = screen.getByRole("button", { name: /chụp và xử lý ảnh/i });

      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText("Ảnh đã chụp:")).toBeInTheDocument();
        expect(screen.getByAltText("Captured")).toHaveAttribute("src", "");
      });

      // The link should now have empty href and text
      expect(screen.getByRole("link")).toHaveAttribute("href", "/");
      expect(screen.getByRole("link")).toHaveTextContent("");
    });
  });
});
