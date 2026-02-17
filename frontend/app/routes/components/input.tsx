import { useState } from "react";
import { Input } from "~/components/base";

export default function InputPage() {
  const [value, setValue] = useState("");

  return (
    <div className="max-w-2xl space-y-10">
      <h1 className="text-2xl font-bold">Input</h1>

      {/* Default */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Default</h2>
        <Input placeholder="Email" />
      </section>

      {/* File */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">File</h2>
        <Input type="file" />
      </section>

      {/* Disabled */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Disabled</h2>
        <Input placeholder="Disabled" disabled />
      </section>

      {/* Invalid */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Invalid</h2>
        <Input aria-invalid placeholder="Invalid input" />
      </section>

      {/* With Label */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">With Label</h2>
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input id="email" type="email" placeholder="you@example.com" />
          <p className="text-sm text-muted-foreground">Enter your email address.</p>
        </div>
      </section>

      {/* Controlled */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Controlled</h2>
        <Input
          placeholder="Type something..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">Value: {value}</p>
      </section>

      {/* Grid */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Grid</h2>
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="First name" />
          <Input placeholder="Last name" />
          <Input placeholder="Username" />
          <Input placeholder="Phone" />
        </div>
      </section>
    </div>
  );
}
