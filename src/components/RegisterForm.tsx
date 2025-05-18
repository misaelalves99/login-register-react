// src/components/RegisterForm.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Substituindo o useRouter por useNavigate
import { FaGoogle, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { useAuth } from "../context/AuthContext";
import styles from "./RegisterForm.module.css";
import FormInput from "../components/FormInput";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate(); // Usando react-router-dom
  const { register } = useAuth();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await register(formData.name, formData.email, formData.password);
      setMessage("✅ Conta criada com sucesso!");
      setTimeout(() => navigate("/auth"), 1500); // Substituindo router.push() por navigate
    } catch (err) {
      console.error(err);
      setMessage("❌ Falha ao criar conta. Tente novamente.");
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

        <form onSubmit={handleSubmit} className={styles.form}>
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

          {message && <div className={styles.errorMessage}>{message}</div>}

          <button type="submit" className={styles.button} disabled={loading}>
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
          <button type="button" className={styles.google} onClick={() => handleSocialRegister("Google")}>
            <span className={styles.icon}>
              <FaGoogle />
            </span>
          </button>
          <button type="button" className={styles.facebook} onClick={() => handleSocialRegister("Facebook")}>
            <span className={styles.icon}>
              <FaFacebookF />
            </span>
          </button>
          <button type="button" className={styles.instagram} onClick={() => handleSocialRegister("Instagram")}>
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
