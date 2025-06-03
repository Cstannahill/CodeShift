// src/features/translation/FrameworkSelector.tsx
import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { FRAMEWORK_OPTIONS } from "@/lib/utils/constants";
import { getFrameworkColor } from "@/lib/utils/frameworks";

interface FrameworkSelectorProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function FrameworkSelector({
  value,
  onValueChange,
  placeholder = "Select framework",
  disabled,
  className,
}: FrameworkSelectorProps) {
  const selectedFramework = FRAMEWORK_OPTIONS.find((f) => f.value === value);

  return (
    <Select.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <Select.Trigger
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        <div className="flex items-center gap-2">
          {selectedFramework && (
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: getFrameworkColor(selectedFramework.label),
              }}
            />
          )}
          <Select.Value placeholder={placeholder} />
        </div>
        <Select.Icon asChild>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80"
          position="popper"
        >
          <Select.Viewport className="p-1">
            {FRAMEWORK_OPTIONS.map((framework) => (
              <Select.Item
                key={framework.value}
                value={framework.value}
                className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                style={{
                  backgroundColor: "hsl(var(--popover))",
                  color: "hsl(var(--popover-foreground))",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                  e.currentTarget.style.color = "hsl(var(--accent-foreground))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "hsl(var(--popover))";
                  e.currentTarget.style.color =
                    "hsl(var(--popover-foreground))";
                }}
              >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  <Select.ItemIndicator>
                    <Check className="h-4 w-4" />
                  </Select.ItemIndicator>
                </span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: getFrameworkColor(framework.label),
                    }}
                  />
                  <Select.ItemText>{framework.label}</Select.ItemText>
                </div>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
