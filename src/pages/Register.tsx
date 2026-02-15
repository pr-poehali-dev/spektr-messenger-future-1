import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const LOGO_URL =
  "https://cdn.poehali.dev/files/253981b6-4019-40cc-81a7-eee612064ad1.jpg";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatar(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !username.trim() ||
      !displayName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Пароли не совпадают",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Ошибка",
        description: "Пароль должен быть не менее 6 символов",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("spektr_users") || "[]");

      const exists = users.find(
        (u: { username: string; email: string }) =>
          u.username === username || u.email === email
      );

      if (exists) {
        toast({
          title: "Ошибка",
          description: "Пользователь с таким именем или email уже существует",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const newUser = {
        username,
        displayName,
        email,
        password,
        avatar,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem("spektr_users", JSON.stringify(users));
      localStorage.setItem("spektr_current_user", JSON.stringify(newUser));

      setLoading(false);
      navigate("/chat");
    }, 500);
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
              Создайте новый аккаунт
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="relative group"
              >
                <div className="w-20 h-20 rounded-full bg-secondary border-2 border-dashed border-border flex items-center justify-center overflow-hidden transition-all group-hover:border-primary/50">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Аватар"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icon
                      name="Camera"
                      size={24}
                      className="text-muted-foreground group-hover:text-primary transition-colors"
                    />
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                  <Icon name="Plus" size={14} className="text-primary-foreground" />
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Имя пользователя</label>
              <div className="relative">
                <Icon
                  name="AtSign"
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value.toLowerCase().replace(/\s/g, ""))
                  }
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Отображаемое имя</label>
              <div className="relative">
                <Icon
                  name="User"
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="text"
                  placeholder="Ваше имя"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="pl-10"
                />
              </div>
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
                  placeholder="Минимум 6 символов"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Подтвердите пароль</label>
              <div className="relative">
                <Icon
                  name="Lock"
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="password"
                  placeholder="Повторите пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                />
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
                "Зарегистрироваться"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Уже есть аккаунт?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
