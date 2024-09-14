<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "../ui/label";
import { ArrowRightIcon } from "@heroicons/vue/16/solid";
</script>

<template>
  <section>
    <div class="container mx-auto py-10 md:py-16 lg:py-32 flex flex-col">
      <h1 class="font-bold text-3xl xl:text-5xl mb-10 self-center text-center gradient-text">Contact</h1>
      <div class="w-full md:w-8/12 lg:w-6/12 mx-auto flex flex-col">
        <div class="grid w-full items-center gap-2">
          <Label for="email" class="mb-2">Email</Label>
          <Input
            placeholder="Your Name"
            class="bg-transparent border-2 border-input placeholder:text-input-placeholder mb-5 lg:mb-10"
          />
        </div>
        <div class="grid w-full items-center gap-2">
          <Label for="email" class="mb-2">Email</Label>
          <Input
            placeholder="Your Email"
            class="bg-transparent border-2 border-input placeholder:text-input-placeholder mb-5 lg:mb-10"
          />
        </div>
        <div class="grid w-full items-center gap-2 mb-6">
          <Label for="email" class="mb-2">Description</Label>
          <Textarea
            rows="6"
            placeholder="Describe something"
            class="bg-transparent border-2 border-input placeholder:text-input-placeholder"
          />
        </div>
        <button class="btn btn-primary w-[120px] self-center flex items-center submit-btn overflow-hidden">
          <span>Submit</span>
          <span><ArrowRightIcon class="size-6" /></span>
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.submit-btn {
  transition: all 0.5s ease;
  position: relative;

  span {
    position: absolute;
    transition: all 0.5s ease;

    &:first-child {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &:last-child {
      left: 100%;
    }
  }

  &:hover {
    span {
      &:first-child {
        top: 50%;
        left: 40%;
        transform: translate(-50%, -50%);
      }
      &:last-child {
        left: 70%;
      }
    }
  }
}
</style>
