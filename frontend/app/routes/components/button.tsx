import { RiGitBranchLine, RiMailLine, RiLoader4Line, RiDownloadLine, RiArrowRightLine } from "@remixicon/react";
import { Button } from "~/components/base";

export default function ButtonPage() {
  return (
    <div className="max-w-2xl space-y-10">
      <h1 className="text-2xl font-bold">Button</h1>

      {/* Size */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Size</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* Default */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Default</h2>
        <Button>Button</Button>
      </section>

      {/* Outline */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Outline</h2>
        <Button variant="outline">Outline</Button>
      </section>

      {/* Secondary */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Secondary</h2>
        <Button variant="secondary">Secondary</Button>
      </section>

      {/* Ghost */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Ghost</h2>
        <Button variant="ghost">Ghost</Button>
      </section>

      {/* Destructive */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Destructive</h2>
        <Button variant="destructive">Delete Account</Button>
      </section>

      {/* Link */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Link</h2>
        <Button variant="link">Link Button</Button>
      </section>

      {/* Icon */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Icon</h2>
        <div className="flex items-center gap-3">
          <Button size="icon-xs"><RiMailLine /></Button>
          <Button size="icon-sm"><RiMailLine /></Button>
          <Button size="icon"><RiMailLine /></Button>
          <Button size="icon-lg"><RiMailLine /></Button>
        </div>
      </section>

      {/* With Icon */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">With Icon</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button>
            <RiGitBranchLine />
            New Branch
          </Button>
          <Button variant="outline">
            Next
            <RiArrowRightLine />
          </Button>
        </div>
      </section>

      {/* Rounded */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Rounded</h2>
        <div className="flex items-center gap-3">
          <Button className="rounded-full">Rounded</Button>
          <Button size="icon" className="rounded-full"><RiMailLine /></Button>
        </div>
      </section>

      {/* Spinner */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Spinner</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>
            <RiLoader4Line className="animate-spin" />
            Generating...
          </Button>
          <Button variant="outline" disabled>
            <RiDownloadLine className="animate-bounce" />
            Downloading...
          </Button>
        </div>
      </section>

      {/* Disabled */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Disabled</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>Disabled</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </div>
      </section>
    </div>
  );
}
