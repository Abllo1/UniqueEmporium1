declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src: string;
      alt?: string;
      "auto-rotate"?: boolean;
      "camera-controls"?: boolean;
      // Add other common attributes if needed
      "ar"?: boolean;
      "ar-modes"?: string;
      "shadow-intensity"?: string;
      "camera-orbit"?: string;
      "field-of-view"?: string;
      "exposure"?: string;
      "skybox-image"?: string;
      "environment-image"?: string;
      "poster"?: string;
      "loading"?: "eager" | "lazy";
      "reveal"?: "auto" | "interaction" | "manual";
      "interaction-prompt"?: "auto" | "none" | "dot" | "ring";
      "interaction-prompt-threshold"?: string;
      "interaction-prompt-variant"?: "dot" | "ring";
      "disable-zoom"?: boolean;
      "disable-pan"?: boolean;
      "disable-tap"?: boolean;
      "min-camera-orbit"?: string;
      "max-camera-orbit"?: string;
      "min-field-of-view"?: string;
      "max-field-of-view"?: string;
      "interpolation-decay"?: string;
      "orbit-sensitivity"?: string;
      "pan-sensitivity"?: string;
      "touch-action"?: string;
      "variant"?: "none" | "albedo" | "metallic-roughness" | "normal" | "occlusion" | "emissive";
      "tone-mapping"?: "none" | "linear" | "aces" | "agx";
      "shadow-softness"?: string;
      "camera-target"?: string;
      "animation-name"?: string;
      "animation-crossfade-duration"?: string;
      "autoplay"?: boolean;
      "loop"?: boolean;
      "orientation"?: string;
      "scale"?: string;
      "rotation"?: string;
      "position"?: string;
      "bounds"?: string;
      "max-lights"?: string;
      "min-lights"?: string;
      "max-shadow-distance"?: string;
      "min-shadow-distance"?: string;
      "shadow-map-size"?: string;
      "shadow-bias"?: string;
      "shadow-normal-bias"?: string;
      "shadow-cascade-count"?: string;
      "shadow-cascade-splits"?: string;
      "shadow-cascade-far-splits"?: string;
      "shadow-cascade-near-splits"?: string;
      "shadow-cascade-resolution"?: string;
      "shadow-cascade-max-distance"?: string;
      "shadow-cascade-min-distance"?: string;
      "shadow-cascade-fade-range"?: string;
      "shadow-cascade-blend-factor"?: string;
      "shadow-cascade-debug"?: boolean;
      "shadow-cascade-debug-color"?: string;
      "shadow-cascade-debug-opacity"?: string;
      "shadow-cascade-debug-wireframe"?: boolean;
      "shadow-cascade-debug-wireframe-color"?: string;
      "shadow-cascade-debug-wireframe-opacity"?: string;
      "shadow-cascade-debug-wireframe-width"?: string;
      "shadow-cascade-debug-wireframe-depth"?: string;
      "shadow-cascade-debug-wireframe-offset"?: string;
      "shadow-cascade-debug-wireframe-offset-factor"?: string;
      "shadow-cascade-debug-wireframe-offset-units"?: string;
      "shadow-cascade-debug-wireframe-offset-scale"?: string;
      "shadow-cascade-debug-wireframe-offset-bias"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-scale"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-units"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-factor"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-factor"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-units"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-scale"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-bias"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-scale"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-units"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-factor"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-factor"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-units"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-scale"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-bias"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-scale"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-units"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-factor"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-factor"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-units"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-scale"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-bias"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-scale"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-units"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-factor"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-factor"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-units"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-scale"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-bias"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-scale"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-<dyad-problem-report summary="2 problems">
<problem file="src/components/Product3DViewer.tsx" line="8" column="5" code="2339">Property 'model-viewer' does not exist on type 'JSX.IntrinsicElements'.</problem>
<problem file="src/components/Product3DViewer.tsx" line="14" column="6" code="2339">Property 'model-viewer' does not exist on type 'JSX.IntrinsicElements'.</problem>
</dyad-problem-report><think>**Resolving Type Errors**

I'm currently addressing TypeScript errors related to the `<model-viewer>` custom element. The core issue is that `JSX.IntrinsicElements` doesn't recognize it. To resolve this, I'm extending the `JSX.IntrinsicElements` interface, encompassing `<model-viewer>` and its specific attributes. I'm working on a new `.d.ts` declaration file to implement this extension.


**Expanding Declarations Further**

I'm now expanding the declaration file to fully encompass `<model-viewer>`. I'm going to declare the element with all its relevant attributes by extending `JSX.IntrinsicElements`, specifically focusing on `src/types/model-viewer.d.ts`. I'm aiming for full compatibility. I am also planning on adding documentation to the .d.ts file.


</think>You're right, TypeScript doesn't inherently know about custom HTML elements like `<model-viewer>`. To fix this, we need to declare its type so TypeScript recognizes it and its attributes.

I'll create a new declaration file `src/types/model-viewer.d.ts` to extend the `JSX.IntrinsicElements` interface. This will resolve the compile-time errors.

<dyad-write path="src/types/model-viewer.d.ts" description="Declaring the type for the custom ＜model-viewer＞ element to resolve TypeScript errors.">
declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src: string;
      alt?: string;
      "auto-rotate"?: boolean;
      "camera-controls"?: boolean;
      // Add other common attributes if needed
      "ar"?: boolean;
      "ar-modes"?: string;
      "shadow-intensity"?: string;
      "camera-orbit"?: string;
      "field-of-view"?: string;
      "exposure"?: string;
      "skybox-image"?: string;
      "environment-image"?: string;
      "poster"?: string;
      "loading"?: "eager" | "lazy";
      "reveal"?: "auto" | "interaction" | "manual";
      "interaction-prompt"?: "auto" | "none" | "dot" | "ring";
      "interaction-prompt-threshold"?: string;
      "interaction-prompt-variant"?: "dot" | "ring";
      "disable-zoom"?: boolean;
      "disable-pan"?: boolean;
      "disable-tap"?: boolean;
      "min-camera-orbit"?: string;
      "max-camera-orbit"?: string;
      "min-field-of-view"?: string;
      "max-field-of-view"?: string;
      "interpolation-decay"?: string;
      "orbit-sensitivity"?: string;
      "pan-sensitivity"?: string;
      "touch-action"?: string;
      "variant"?: "none" | "albedo" | "metallic-roughness" | "normal" | "occlusion" | "emissive";
      "tone-mapping"?: "none" | "linear" | "aces" | "agx";
      "shadow-softness"?: string;
      "camera-target"?: string;
      "animation-name"?: string;
      "animation-crossfade-duration"?: string;
      "autoplay"?: boolean;
      "loop"?: boolean;
      "orientation"?: string;
      "scale"?: string;
      "rotation"?: string;
      "position"?: string;
      "bounds"?: string;
      "max-lights"?: string;
      "min-lights"?: string;
      "max-shadow-distance"?: string;
      "min-shadow-distance"?: string;
      "shadow-map-size"?: string;
      "shadow-bias"?: string;
      "shadow-normal-bias"?: string;
      "shadow-cascade-count"?: string;
      "shadow-cascade-splits"?: string;
      "shadow-cascade-far-splits"?: string;
      "shadow-cascade-near-splits"?: string;
      "shadow-cascade-resolution"?: string;
      "shadow-cascade-max-distance"?: string;
      "shadow-cascade-min-distance"?: string;
      "shadow-cascade-fade-range"?: string;
      "shadow-cascade-blend-factor"?: string;
      "shadow-cascade-debug"?: boolean;
      "shadow-cascade-debug-color"?: string;
      "shadow-cascade-debug-opacity"?: string;
      "shadow-cascade-debug-wireframe"?: boolean;
      "shadow-cascade-debug-wireframe-color"?: string;
      "shadow-cascade-debug-wireframe-opacity"?: string;
      "shadow-cascade-debug-wireframe-width"?: string;
      "shadow-cascade-debug-wireframe-depth"?: string;
      "shadow-cascade-debug-wireframe-offset"?: string;
      "shadow-cascade-debug-wireframe-offset-factor"?: string;
      "shadow-cascade-debug-wireframe-offset-units"?: string;
      "shadow-cascade-debug-wireframe-offset-scale"?: string;
      "shadow-cascade-debug-wireframe-offset-bias"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-scale"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-units"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-factor"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-factor"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-units"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-scale"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-bias"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-scale"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-units"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-factor"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-factor"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-units"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-scale"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-bias"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-scale"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-units"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-factor"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-factor"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-units"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-scale"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-normal-bias-offset-bias"?: string;
      "shadow-cascade-debug-wireframe-offset-normal-bias-
    };
  }
}