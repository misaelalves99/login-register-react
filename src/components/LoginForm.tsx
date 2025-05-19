// src/components/LoginForm.tsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaInstagram } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import FormInput from "./FormInput";
import styles from "./LoginForm.module.css";

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("Preencha todos os campos.");
      setLoading(false);
      return;
    }

    try {
      if (onSubmit) {
        onSubmit(formData.email, formData.password);
      } else {
        await login(formData.email, formData.password);
        alert("Login realizado com sucesso!");
        navigate("/");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Erro ao fazer login.");
      } else {
        setError("Erro inesperado ao fazer login.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (platform: string) => {
    alert(`Login com ${platform} ainda não implementado.`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Entrar</h2>
        <p className={styles.subtitle}>
          Bem-vindo de volta! Entre com seu e-mail e senha.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu e-mail"
          />
          <FormInput
            label="Senha"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Digite sua senha"
          />

          {error && <div className={styles.errorMessage}>{error}</div>}

          <Link to="/recover-password" className={styles.link}>
            Esqueceu a senha?
          </Link>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className={styles.links}>
          <p className={styles.registerLink}>
            Não tem uma conta?{" "}
            <Link to="/register" className={styles.link}>
              Cadastre-se
            </Link>
          </p>
        </div>

        <div className={styles.divider}>ou entre com</div>
        <div className={styles.socialButtons}>
          <button
            type="button"
            className={styles.google}
            onClick={() => handleSocialLogin("Google")}
          >
            <span className={styles.icon}>
              <FaGoogle />
            </span>
          </button>
          <button
            type="button"
            className={styles.facebook}
            onClick={() => handleSocialLogin("Facebook")}
          >
            <span className={styles.icon}>
              <FaFacebookF />
            </span>
          </button>
          <button
            type="button"
            className={styles.instagram}
            onClick={() => handleSocialLogin("Instagram")}
          >
            <span className={styles.icon}>
              <FaInstagram />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
