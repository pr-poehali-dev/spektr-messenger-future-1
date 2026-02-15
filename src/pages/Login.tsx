import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const LOGO_URL =
  "https://cdn.poehali.dev/files/253981b6-4019-40cc-81a7-eee612064ad1.jpg";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("spektr_users") || "[]");
      const user = users.find(
        (u: { email: string; password: string }) =>
          u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem("spektr_current_user", JSON.stringify(user));
      } else {
        localStorage.setItem(
          "spektr_current_user",
          JSON.stringify({
            email,
            username: email.split("@")[0],
            displayName: email.split("@")[0],
            avatar: null,
          })
        );
      }

      setLoading(false);
      navigate("/chat");
    }, 500);
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();

    if (!resetEmail.trim() || !resetPassword.trim()) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля для сброса пароля",
        variant: "destructive",
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem("spektr_users") || "[]");
    const userIndex = users.findIndex(
      (u: { email: string }) => u.email === resetEmail
    );

    if (userIndex >= 0) {
      users[userIndex].password = resetPassword;
      localStorage.setItem("spektr_users", JSON.stringify(users));
    }

    toast({
      title: "Готово",
      description: "Пароль успешно обновлён",
    });
    setShowReset(false);
    setResetEmail("");
    setResetPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 spektr-gradient-subtle">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative">
        <div className="animate-fade-in bg-card border border-border/50 rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col items-center mb-8">
            <img
              src={LOGO_URL}
              alt="Spektr"
              className="w-16 h-16 rounded-2xl mb-4 spektr-glow"
            />
            <h1 className="text-2xl font-bold tracking-tight">Spektr</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Войдите в свой аккаунт
            </p>
          </div>

          {!showReset ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Icon
                    name="Mail"
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Пароль</label>
                <div className="relative">
                  <Icon
                    name="Lock"
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon
                      name={showPassword ? "EyeOff" : "Eye"}
                      size={18}
                    />
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full spektr-gradient border-0"
                disabled={loading}
              >
                {loading ? (
                  <Icon name="Loader2" size={18} className="animate-spin" />
                ) : (
                  "Войти"
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowReset(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Забыли пароль?
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setShowReset(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name="ArrowLeft" size={20} />
                </button>
                <h2 className="text-lg font-semibold">Сброс пароля</h2>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Icon
                    name="Mail"
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Новый пароль</label>
                <div className="relative">
                  <Icon
                    name="Lock"
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    type="password"
                    placeholder="Введите новый пароль"
                    value={resetPassword}
                    onChange={(e) => setResetPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full spektr-gradient border-0">
                Сбросить пароль
              </Button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Нет аккаунта?{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
            >
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
