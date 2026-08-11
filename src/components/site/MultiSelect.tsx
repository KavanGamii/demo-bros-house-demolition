import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, X } from "lucide-react";

export interface MultiSelectOption {
  value: string;
  label: string;
}

/** Gap between the field and the floating panel, and the margin it keeps off the viewport edge. */
const GAP = 8;
const EDGE = 12;
const MAX_PANEL_HEIGHT = 300;
const MIN_PANEL_HEIGHT = 160;

interface PanelPosition {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
  /** True when there was more room above the field than below it. */
  flipped: boolean;
}

/**
 * A dropdown that takes more than one answer, and shows them.
 *
 * "What needs to come out?" is multi-select (copy deck v8, build note 2), and
 * neither of the obvious options works: a grid of checkboxes eats half the form,
 * and a native `<select multiple>` needs ctrl-click to add a second choice — a
 * gesture that does not exist on a phone, where most of this traffic lands.
 *
 * The panel is PORTALLED to <body> and positioned `fixed` from the field's
 * measured rect. That is not over-engineering: this control renders inside the
 * quote modal, whose panel is `overflow-hidden` to keep its rounded corners, so
 * an ordinary absolutely-positioned dropdown gets sliced off by an ancestor it
 * has no way of knowing about. Portalled out, nothing can clip it — and it can
 * flip above the field when it would otherwise run off the bottom of the screen.
 */
export function MultiSelect({
  options,
  value,
  onChange,
  onBlur,
  placeholder = "Select…",
  id,
  invalid,
  triggerClassName = "",
  panelClassName = "",
  optionClassName = "",
  chipClassName = "",
}: {
  options: MultiSelectOption[];
  value: string[];
  onChange: (next: string[]) => void;
  onBlur?: () => void;
  placeholder?: string;
  id?: string;
  invalid?: boolean;
  /** Styling hooks so one control can serve the light card and the green panel. */
  triggerClassName?: string;
  panelClassName?: string;
  optionClassName?: string;
  chipClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<PanelPosition | null>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);
  const generatedId = useId();
  const listId = `${id ?? generatedId}-listbox`;
  const errorId = `${id ?? generatedId}-error`;

  // The portal target only exists on the client.
  useEffect(() => setMounted(true), []);

  /** Measures the field and decides whether the panel hangs below or above it. */
  const updatePosition = useCallback(() => {
    const field = fieldRef.current;
    if (!field) return;

    const rect = field.getBoundingClientRect();
    const roomBelow = window.innerHeight - rect.bottom - GAP - EDGE;
    const roomAbove = rect.top - GAP - EDGE;
    const flipped = roomBelow < MIN_PANEL_HEIGHT && roomAbove > roomBelow;
    const available = flipped ? roomAbove : roomBelow;

    setPosition({
      top: flipped ? rect.top - GAP : rect.bottom + GAP,
      left: rect.left,
      width: rect.width,
      maxHeight: Math.max(MIN_PANEL_HEIGHT, Math.min(MAX_PANEL_HEIGHT, available)),
      flipped,
    });
  }, []);

  // Position before paint, so the panel never appears in the wrong place first.
  useLayoutEffect(() => {
    if (open) updatePosition();
  }, [open, updatePosition]);

  // Fixed positioning is relative to the viewport, so anything that moves the
  // field has to re-measure. `capture: true` is what catches scrolling inside
  // the modal — that scroll event never reaches window on the bubble phase.
  useEffect(() => {
    if (!open) return;
    const onScrollOrResize = () => updatePosition();
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open, updatePosition]);

  // Close on click-away and on Escape. The panel is outside the field in the
  // DOM now, so both have to be checked before treating a click as "outside".
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (fieldRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      setOpen(false);
      onBlur?.();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onBlur]);

  function toggle(optionValue: string) {
    onChange(
      value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue],
    );
  }

  /* Chips follow the order of the options list, not the order they were ticked,
     so the field reads the same way the menu does. */
  const selected = options.filter((o) => value.includes(o.value));

  const panel = open && position && (
    <ul
      ref={panelRef}
      id={listId}
      role="listbox"
      aria-multiselectable="true"
      aria-label="What needs to come out"
      // Lenis smooths the wheel for the whole document, and this panel is
      // portalled to <body> — outside the modal's own data-lenis-prevent
      // container — so every wheel event over the list was being taken by Lenis
      // and applied to the page instead of scrolling the options. This opts the
      // panel out and hands it back native scrolling.
      data-lenis-prevent
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
        maxHeight: position.maxHeight,
        // Flipped, `top` is the field's upper edge, so the panel is pulled up by
        // its own height to sit above it.
        transform: position.flipped ? "translateY(-100%)" : undefined,
      }}
      className={`fixed z-[400] overflow-y-auto overscroll-contain rounded-md border shadow-2xl shadow-black/25 ${panelClassName}`}
    >
      {options.map((o) => {
        const checked = value.includes(o.value);
        return (
          <li key={o.value}>
            <button
              type="button"
              role="option"
              aria-selected={checked}
              onClick={() => toggle(o.value)}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-150 ${optionClassName}`}
            >
              {/* A tick box, not a native checkbox: the row itself is the
                  control, and a real input inside a button is invalid HTML. */}
              <span
                aria-hidden="true"
                className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[3px] border transition-colors duration-150 ${
                  checked ? "border-primary bg-primary text-white" : "border-black/25"
                }`}
              >
                {checked && <Check className="h-3 w-3" strokeWidth={3.5} />}
              </span>
              {o.label}
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="relative">
      {/* A div, not a button: the chips carry their own remove buttons, and a
          button nested inside a button is invalid markup that browsers resolve
          by dropping one of them. The chevron is the real focusable control. */}
      <div
        ref={fieldRef}
        onClick={() => setOpen(true)}
        className={`flex cursor-pointer items-start gap-2 ${triggerClassName}`}
      >
        <div className="flex min-h-6 flex-1 flex-wrap items-center gap-1.5">
          {selected.length === 0 ? (
            <span className="opacity-60">{placeholder}</span>
          ) : (
            selected.map((o) => (
              <span
                key={o.value}
                className={`inline-flex max-w-full items-center gap-1.5 rounded-full py-1 pr-1.5 pl-2.5 text-xs leading-tight font-semibold ${chipClassName}`}
              >
                <span className="truncate">{o.label}</span>
                <button
                  type="button"
                  aria-label={`Remove ${o.label}`}
                  onClick={(e) => {
                    // Without this the click bubbles to the field and reopens
                    // the menu the moment a chip is dismissed.
                    e.stopPropagation();
                    toggle(o.value);
                  }}
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-black/20"
                >
                  <X className="h-3 w-3" strokeWidth={3} />
                </button>
              </span>
            ))
          )}
        </div>

        <button
          type="button"
          id={id}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((v) => !v);
          }}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-describedby={invalid ? errorId : undefined}
          aria-label="Choose what needs to come out"
          className="mt-0.5 shrink-0"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {mounted && panel && createPortal(panel, document.body)}

      {/* Selected values in the DOM, so a plain form post and any autofill or
          analytics tooling still sees the answer. */}
      {value.map((v) => (
        <input key={v} type="hidden" name="services[]" value={v} />
      ))}
    </div>
  );
}
