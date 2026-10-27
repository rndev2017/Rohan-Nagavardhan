/** Step between whole sprite cells, including when a movement is interrupted. */
export function createCameraPoses(render: (frame: number) => void) {
  let frame = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const cancel = () => { clearTimeout(timer); };
  return {
    adopt(position: number) {
      cancel();
      frame = Math.max(0, Math.min(2, Math.round(position / 50)));
      render(frame);
    },
    move(target: 0 | 2) {
      cancel();
      const step = () => {
        if (frame === target) return;
        frame += Math.sign(target - frame);
        render(frame);
        if (frame !== target) timer = setTimeout(step, 180);
      };
      if (frame !== target) timer = setTimeout(step, 180);
    },
    cancel,
  };
}
