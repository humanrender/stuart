import { render, screen } from "@testing-library/react";

import { SubmitButton } from "../../components/SubmitButton";

describe("SubmitButton", () => {
  describe("when not ready", () => {
    describe("and not submitting", () => {
      beforeEach(() => {
        render(
          <SubmitButton
            label="Submit"
            submittingLabel="Submitting"
            ready={false}
            submitting={false}
          />
        );
      });
      it("should show the label", () => {
        expect(screen.getByRole("button")).toHaveTextContent("Submit");
      });
      it("should not be disabled", () => {
        expect(screen.getByRole("button")).toBeDisabled();
      });
    });
    describe("and submitting", () => {
      beforeEach(() => {
        render(
          <SubmitButton
            label="Submit"
            submittingLabel="Submitting"
            ready={false}
            submitting={false}
          />
        );
      });
      it("should show the label", () => {
        expect(screen.getByRole("button")).toHaveTextContent("Submit");
      });
      it("should not be disabled", () => {
        expect(screen.getByRole("button")).toBeDisabled();
      });
    });
  });
  describe("when ready", () => {
    describe("and not submitting", () => {
      beforeEach(() => {
        render(
          <SubmitButton
            label="Submit"
            submittingLabel="Submitting"
            ready={true}
            submitting={false}
          />
        );
      });
      it("should show the label", () => {
        expect(screen.getByRole("button")).toHaveTextContent("Submit");
      });
      it("should not be disabled", () => {
        expect(screen.getByRole("button")).not.toBeDisabled();
      });
    });
    describe("and submitting", () => {
      beforeEach(() => {
        render(
          <SubmitButton
            label="Submit"
            submittingLabel="Submitting"
            ready={true}
            submitting={true}
          />
        );
      });
      it("should show the label", () => {
        expect(screen.getByRole("button")).toHaveTextContent("Submitting");
      });
      it("should not be disabled", () => {
        expect(screen.getByRole("button")).toBeDisabled();
      });
    });
  });
});
