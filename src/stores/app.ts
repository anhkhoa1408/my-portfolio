import { defineStore } from "pinia";
import { reactive } from "vue";
type AppMode = "dark" | "light";

type AppConfigs = {
  mode: AppMode;
};

export const useAppStore = defineStore("app", () => {
  const configs = reactive<AppConfigs>({
    mode: "dark",
  });

  const changeConfigs = (newConfigs: AppConfigs) => {
    Object.assign(configs, newConfigs);
  };

  return {
    configs,
    changeConfigs,
  };
});
