import {
  JsonFormsRendererRegistryEntry,
  rankWith,
  scopeEndsWith,
} from "@jsonforms/core";
import cornersControlRenderer from "../renderers/CornersRenderer.vue";

const entryCorners: JsonFormsRendererRegistryEntry = {
  renderer: cornersControlRenderer,
  tester: rankWith(5, scopeEndsWith("corners")),
};

export default [entryCorners];
