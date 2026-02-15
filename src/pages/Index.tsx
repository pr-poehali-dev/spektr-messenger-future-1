import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LOGO_URL =
  "https://cdn.poehali.dev/files/253981b6-4019-40cc-81a7-eee612064ad1.jpg";

const features = [
  {
    icon: "Users",
    title: "Группы, чаты и каналы",
    description: "Общение без границ!",
  },
  {
    icon: "Shield",
    title: "Сквозное шифрование",
    description: "Ваша безопасность превыше всего.",
  },
  {
    icon: "Headphones",
    title: "Быстрое решение вопросов",
    description: "Поддержка доступна круглосуточно.",
  },
  {
    icon: "BadgeCheck",
    title: "Простая верификация",
    description: "Создавайте популярные сообщества.",
  },
];

const faqItems = [
  {
    question: "Сколько нужно ждать, чтобы создать канал?",
    answer: "Несколько минут, это быстро и удобно.",
  },
  {
    question: "Как верифицировать канал?",
    answer:
      "Отправьте заявку через бота верификации в мессенджере.",
  },
  {
    question: "Безопасен ли Spektr?",
    answer:
      "Да, мы используем сквозное шифрование для защиты ваших данных.",
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const elements = node.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return ref;
}

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={LOGO_URL}
            alt="Spektr"
            className="w-10 h-10 rounded-xl"
          />
          <span className="text-xl font-bold tracking-tight">Spektr</span>
        </Link>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Войти</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/register">Регистрация</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 spektr-gradient-subtle" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative flex flex-col items-center justify-center py-28 md:py-40 text-center">
        <div className="animate-fade-in">
          <img
            src={LOGO_URL}
            alt="Spektr"
            className="w-20 h-20 rounded-2xl mx-auto mb-8 spektr-glow"
          />
        </div>

        <h1
          className="animate-fade-in text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="spektr-gradient-text">Spektr</span> — будущее здесь
        </h1>

        <p
          className="animate-fade-in mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          style={{ animationDelay: "0.2s" }}
        >
          Мессенджер с голосовыми сообщениями, эмодзи, каналами и группами.
        </p>

        <div
          className="animate-fade-in mt-10 flex flex-col sm:flex-row gap-4"
          style={{ animationDelay: "0.3s" }}
        >
          <Button size="lg" className="text-base px-8 h-12 spektr-gradient border-0" asChild>
            <Link to="/login">
              Начать общение
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Что уже есть в Spektr?
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            Все необходимое для комфортного общения
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="reveal spektr-card text-center"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-5">
                <Icon
                  name={feature.icon}
                  size={26}
                  className="text-primary"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-24 md:py-32 spektr-gradient-subtle">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto text-center">
          <div className="reveal">
            <p className="text-5xl md:text-6xl font-extrabold spektr-gradient-text">
              15 000+
            </p>
            <p className="mt-3 text-muted-foreground text-lg">Пользователей</p>
          </div>
          <div className="reveal" style={{ transitionDelay: "0.1s" }}>
            <p className="text-5xl md:text-6xl font-extrabold spektr-gradient-text">
              28 000+
            </p>
            <p className="mt-3 text-muted-foreground text-lg">
              Активных групп и каналов
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container max-w-2xl">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Часто задаваемые вопросы
          </h2>
        </div>

        <div className="reveal">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container text-center">
        <div className="reveal max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Не медли, общайся уже сейчас!
          </h2>
          <Button
            size="lg"
            className="text-base px-10 h-13 spektr-gradient border-0 transition-transform hover:scale-105"
            asChild
          >
            <Link to="/register">
              Начать
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/40 py-10">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <p>&copy; 2026, Spektr</p>

          <div className="flex items-center gap-6">
            <a
              href="https://t.me/spektr_mess"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Icon name="Send" size={16} />
              @spektr_mess
            </a>
            <a
              href="mailto:spektr831@gmail.com"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Icon name="Mail" size={16} />
              spektr831@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="hover:text-foreground transition-colors"
            >
              Войти
            </Link>
            <Link
              to="/register"
              className="hover:text-foreground transition-colors"
            >
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

const Index = () => {
  const revealRef = useReveal();

  return (
    <div ref={revealRef} className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
