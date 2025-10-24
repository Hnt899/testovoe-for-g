import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Paperclip, X, Check, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import heroOffice from "@/assets/hero-office.jpg";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .regex(/^[а-яА-ЯёЁa-zA-Z\s]+$/, "Имя должно содержать только буквы"),
  phone: z
    .string()
    .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Неверный формат телефона"),
  email: z.string().email("Неверный формат email"),
  position: z.string().optional(),
  employmentType: z.enum(["office", "internship", "remote"], {
    required_error: "Выберите категорию занятости",
  }),
  questions: z.string().max(500, "Максимум 500 символов").optional(),
});

type FormData = z.infer<typeof formSchema>;

export const InterviewForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const questions = watch("questions") || "";
  const phone = watch("phone") || "";
  const email = watch("email") || "";

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length === 0) return "";
    if (numbers.length <= 1) return `+${numbers}`;
    if (numbers.length <= 4) return `+7 (${numbers.slice(1)}`;
    if (numbers.length <= 7)
      return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4)}`;
    if (numbers.length <= 9)
      return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7)}`;
    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue("phone", formatted, { shouldValidate: true });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error("Файл слишком большой (максимум 5 МБ)");
      return;
    }
    if (!ACCEPTED_FILE_TYPES.includes(selectedFile.type)) {
      toast.error("Допустимые форматы: .pdf, .doc, .docx");
      return;
    }
    setFile(selectedFile);
    toast.success("Файл прикреплен");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Mock submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form data:", data);
      console.log("File:", file);

      toast.success("Заявка отправлена", {
        description: "Мы свяжемся с вами в ближайшее время!",
      });

      reset();
      setFile(null);
    } catch (error) {
      toast.error("Ошибка отправки", {
        description: "Пожалуйста, попробуйте еще раз",
      });
    }
  };

  const isEmailValid = email && !errors.email;
  const isPhoneValid = phone && !errors.phone;

  return (
    <section
      id="interview-form"
      className="relative py-20 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroOffice})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/60 to-transparent" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>
      <div className="relative container mx-auto px-4 max-w-2xl">
        <div className="bg-primary rounded-lg p-8 md:p-12 card-shadow">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            Записаться на собеседование
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-white font-medium">
                Как к вам обращаться? *
              </Label>
              <Input
                id="name"
                {...register("name")}
                className="mt-2 bg-white"
                placeholder="Введите ваше имя"
              />
              {errors.name && (
                <p className="text-red-300 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="relative">
              <Label htmlFor="phone" className="text-white font-medium">
                Телефон *
              </Label>
              <div className="relative mt-2">
                <Input
                  id="phone"
                  {...register("phone")}
                  onChange={handlePhoneChange}
                  className="bg-white pr-10"
                  placeholder="+7 (___) ___-__-__"
                />
                {phone && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isPhoneValid ? (
                      <Check className="h-5 w-5 text-success" />
                    ) : (
                      <XCircle className="h-5 w-5 text-error" />
                    )}
                  </div>
                )}
              </div>
              {errors.phone && (
                <p className="text-red-300 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <Label htmlFor="email" className="text-white font-medium">
                Email *
              </Label>
              <div className="relative mt-2">
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="bg-white pr-10"
                  placeholder="example@mail.com"
                />
                {email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isEmailValid ? (
                      <Check className="h-5 w-5 text-success" />
                    ) : (
                      <XCircle className="h-5 w-5 text-error" />
                    )}
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Position */}
            <div>
              <Label htmlFor="position" className="text-white font-medium">
                Желаемая должность
              </Label>
              <Input
                id="position"
                {...register("position")}
                className="mt-2 bg-white"
                placeholder="Введите должность"
              />
            </div>

            {/* Employment Type */}
            <div>
              <Label className="text-white font-medium block mb-3">
                Выберите категорию занятости *
              </Label>
              <RadioGroup
                onValueChange={(value) =>
                  setValue("employmentType", value as any, {
                    shouldValidate: true,
                  })
                }
              >
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem
                    value="office"
                    id="office"
                    className="border-white text-white"
                  />
                  <Label htmlFor="office" className="text-white font-normal cursor-pointer">
                    Работа в офисе
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem
                    value="internship"
                    id="internship"
                    className="border-white text-white"
                  />
                  <Label
                    htmlFor="internship"
                    className="text-white font-normal cursor-pointer"
                  >
                    Стажировка
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="remote"
                    id="remote"
                    className="border-white text-white"
                  />
                  <Label htmlFor="remote" className="text-white font-normal cursor-pointer">
                    Удалённая работа
                  </Label>
                </div>
              </RadioGroup>
              {errors.employmentType && (
                <p className="text-red-300 text-sm mt-2">
                  {errors.employmentType.message}
                </p>
              )}
            </div>

            {/* Questions */}
            <div>
              <Label htmlFor="questions" className="text-white font-medium">
                Ваши вопросы
              </Label>
              <Textarea
                id="questions"
                {...register("questions")}
                className="mt-2 bg-white min-h-[120px]"
                placeholder="Есть вопросы к нам?"
              />
              <p className="text-white/80 text-sm mt-1">
                {questions.length}/500 символов
              </p>
              {errors.questions && (
                <p className="text-red-300 text-sm mt-1">
                  {errors.questions.message}
                </p>
              )}
            </div>

            {/* File Upload */}
            <div>
              <Label className="text-white font-medium block mb-2">
                Прикрепить резюме
              </Label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  isDragging
                    ? "border-secondary bg-secondary/10"
                    : "border-white/50 bg-white/5"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="flex items-center justify-between bg-white/10 rounded p-3">
                    <div className="flex items-center gap-2">
                      <Paperclip className="h-5 w-5 text-white" />
                      <span className="text-white text-sm">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="text-white hover:text-red-300"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Paperclip className="h-8 w-8 text-white mx-auto mb-2" />
                    <p className="text-white mb-2">
                      Перетащите файл сюда или{" "}
                      <label className="text-secondary cursor-pointer hover:underline">
                        выберите файл
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                        />
                      </label>
                    </p>
                    <p className="text-white/70 text-sm">
                      Форматы: .pdf, .doc, .docx (макс. 5 МБ)
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={!isValid}
                className="flex-1"
              >
                Записаться
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
