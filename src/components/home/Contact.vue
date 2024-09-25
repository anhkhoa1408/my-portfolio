<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRightIcon } from "@heroicons/vue/16/solid";
import { onMounted, ref, watch } from "vue";
import { Label } from "../ui/label";
import { appConfigs } from "@/configs/app";
import { toast } from "vue3-toastify";
import { useTextReveal } from "@/composables/useTextReveal";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const name = ref("");
const email = ref("");
const description = ref("");

const valid = ref(false);
const submitting = ref(false);

useTextReveal("#contact-title");

watch([name, email, description], () => {
  if (name.value && email.value && description.value) {
    const formEle = document.querySelector("#contact-form") as HTMLFormElement;
    const isInputValid = Array.from(formEle.querySelectorAll("input")).every((input) => input.checkValidity());
    const isTextareaValid = Array.from(formEle.querySelectorAll("textarea")).every((input) => input.checkValidity());
    valid.value = isInputValid && isTextareaValid;
  }
});

const handleResetForm = () => {
  name.value = "";
  email.value = "";
  description.value = "";
};

const handleSubmit = async () => {
  submitting.value = true;

  const toastId = toast.loading("Sending contact information", {
    theme: "dark",
  });

  const data = {
    name: name.value,
    from: email.value,
    to: appConfigs.receiverEmail,
    description: description.value,
    contactMetadata: {
      main: appConfigs.facebookUrl,
      facebook: appConfigs.facebookUrl,
      instagram: appConfigs.instagramUrl,
      linkedin: appConfigs.linkedinUrl,
    },
  };

  try {
    const response = await fetch(appConfigs.mailerHost.concat("/api/v1/email/send") || "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": appConfigs.mailerApiKey,
      },
      body: JSON.stringify(data),
    });
    if (response?.status === 200) {
      toast.update(toastId, {
        render: "Successfully send!",
        autoClose: 1000,
        type: "success",
        theme: "dark",
        isLoading: false,
      });
      handleResetForm();
    } else {
      toast.update(toastId, {
        render: "Failed to send, please try again later!",
        autoClose: 1000,
        type: "error",
        theme: "dark",
        isLoading: false,
      });
    }
  } catch (error) {
    toast.update(toastId, {
      render: "Failed to send, please try again later!",
      autoClose: 1000,
      type: "error",
      theme: "dark",
      isLoading: false,
    });
  } finally {
    submitting.value = false;
  }
};

onMounted(() => {
  gsap.fromTo(
    "#contact-form",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      scrollTrigger: {
        trigger: "#contact-form",
        start: "top 60%",
        end: "bottom 60%",
      },
    },
  );
});
</script>

<template>
  <section id="contact">
    <div class="container mx-auto py-10 md:py-16 lg:py-32 flex flex-col">
      <h1 id="contact-title" class="font-bold text-3xl xl:text-5xl mb-10 self-center text-center gradient-text">
        Contact
      </h1>

      <form
        id="contact-form"
        @submit.prevent="handleSubmit"
        class="w-full md:w-8/12 lg:w-6/12 mx-auto flex flex-col will-change-auto"
      >
        <div class="grid w-full items-center gap-2">
          <Label for="name" class="mb-2">Name</Label>
          <Input
            required
            type="text"
            v-model="name"
            placeholder="Your Name"
            class="bg-transparent border-2 border-input placeholder:text-input-placeholder mb-8 lg:mb-10 text-base h-[50px]"
          />
        </div>
        <div class="grid w-full items-center gap-2">
          <Label for="email" class="mb-2">Email</Label>
          <Input
            required
            type="email"
            v-model="email"
            placeholder="Your Email"
            class="bg-transparent border-2 border-input placeholder:text-input-placeholder mb-8 lg:mb-10 text-base h-[50px]"
          />
        </div>
        <div class="grid w-full items-center gap-2 mb-6">
          <Label for="description" class="mb-2">Description</Label>
          <Textarea
            required
            type="text"
            v-model="description"
            rows="6"
            placeholder="Describe something"
            class="bg-transparent border-2 border-input placeholder:text-input-placeholder text-base"
          />
        </div>
        <button
          :disabled="!valid || submitting"
          type="submit"
          class="btn btn-primary w-[120px] self-center flex items-center submit-btn overflow-hidden"
        >
          <span>Submit</span>
          <span><ArrowRightIcon class="size-4" /></span>
        </button>
      </form>
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

  &:not(:disabled):hover {
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
