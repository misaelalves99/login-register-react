// src/components/RegisterForm.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaInstagram } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import FormInput from "./FormInput";
import styles from "./RegisterForm.module.css";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password) {
      setError("Preencha todos os campos.");
      setLoading(false);
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password);
      setSuccess("✅ Conta criada com sucesso!");
      setTimeout(() => navigate("/auth"), 1500);
    } catch (err) {
      console.error(err);
      setError("❌ Falha ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (platform: string) => {
    alert(`Cadastro com ${platform} ainda não implementado.`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Criar Conta</h2>
        <p className={styles.subtitle}>Preencha os dados para criar sua conta.</p>

        <form onSubmit={handleSubmit} className={styles.form} aria-label="Formulário de registro">
          <FormInput
            label="Nome"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite seu nome completo"
          />
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
            placeholder="Crie uma senha segura"
          />

          {(error || success) && (
            <div
              className={
                error ? styles.errorMessage : styles.successMessage
              }
              role="alert"
            >
              {error || success}
            </div>
          )}

          <button
            type="submit"
            className={styles.button}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <div className={styles.links}>
          <p className={styles.registerLink}>
            Já tem uma conta?{" "}
            <a href="/login" className={styles.link}>
              Entrar
            </a>
          </p>
        </div>

        <div className={styles.divider}>ou cadastre-se com</div>
        <div className={styles.socialButtons}>
          <button
            type="button"
            className={styles.google}
            onClick={() => handleSocialRegister("Google")}
          >
            <span className={styles.icon}>
              <FaGoogle />
            </span>
          </button>
          <button
            type="button"
            className={styles.facebook}
            onClick={() => handleSocialRegister("Facebook")}
          >
            <span className={styles.icon}>
              <FaFacebookF />
            </span>
          </button>
          <button
            type="button"
            className={styles.instagram}
            onClick={() => handleSocialRegister("Instagram")}
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

export default RegisterForm;
