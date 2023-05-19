import { renderHook, act } from "@testing-library/react";
import { useUpdateSeasonFetch } from "@/hooks/useUpdateSeasonFetch";

jest.useFakeTimers();

describe("useUpdateSeasonFetch test:", () => {
  it("should check if timeout works", () => {
    const timerSpyOn = jest.spyOn(global, "setTimeout");
    renderHook(() => useUpdateSeasonFetch("id", 1, "test@email.com"));
    act(() => {
      jest.runOnlyPendingTimersAsync();
    });
    expect(timerSpyOn).toHaveBeenCalledTimes(1);
  });
});
