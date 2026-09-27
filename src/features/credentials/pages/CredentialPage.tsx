import { useState } from "react";
import {
  ArrowLeft,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { PublicHeader } from "../../../components/layout/PublicHeader";
import { FormError } from "../../../components/ui/FormError";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";

import { useCredential } from "../api/useCredential";
import { useCredentialPassword } from "../api/useCredentialPassword";
import { useUpdateCredentialPlatformName } from "../api/useUpdateCredentialPlatformName";
import { useUpdateCredentialLogin } from "../api/useUpdateCredentialLogin";
import { useUpdateCredentialPassword } from "../api/useUpdateCredentialPassword";
import { useUpdateCredentialEmail } from "../api/useUpdateCredentialEmail";
import { useUpdateCredentialLink } from "../api/useUpdateCredentialLink";
import { useUpdateCredentialDescription } from "../api/useUpdateCredentialDescription";
import { useDeleteCredential } from "../api/useDeleteCredential";

import { EditableCredentialField } from "../components/EditableCredentialField";

type EditableField =
  | "platformName"
  | "login"
  | "email"
  | "password"
  | "link"
  | "description"
  | null;

export function CredentialPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const credentialId = id ?? "";

  const credential = useCredential(credentialId);
  const credentialPassword = useCredentialPassword(credentialId);

  const updatePlatformName = useUpdateCredentialPlatformName();

  const updateLogin = useUpdateCredentialLogin();

  const updatePassword = useUpdateCredentialPassword();

  const updateEmail = useUpdateCredentialEmail();

  const updateLink = useUpdateCredentialLink();

  const updateDescription = useUpdateCredentialDescription();

  const deleteCredential = useDeleteCredential();

  const [editing, setEditing] = useState<EditableField>(null);

  const [platformName, setPlatformName] = useState("");

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [copied, setCopied] = useState(false);

  function startEditing(field: EditableField) {
    if (!credential.data) {
      return;
    }

    switch (field) {
      case "platformName":
        setPlatformName(credential.data.platformName);
        break;

      case "login":
        setLogin(credential.data.login);
        break;

      case "email":
        setEmail(credential.data.email);
        break;

      case "password":
        setPassword("");
        break;

      case "link":
        setLink(credential.data.link);
        break;

      case "description":
        setDescription(credential.data.description);
        break;
    }

    setEditing(field);

    updatePlatformName.reset();
    updateLogin.reset();
    updatePassword.reset();
    updateEmail.reset();
    updateLink.reset();
    updateDescription.reset();
  }

  function cancelEditing() {
    setEditing(null);
    setPassword("");

    updatePlatformName.reset();
    updateLogin.reset();
    updatePassword.reset();
    updateEmail.reset();
    updateLink.reset();
    updateDescription.reset();
  }

  async function handleShowPassword() {
    if (showPassword) {
      setShowPassword(false);
      return;
    }

    if (!credentialPassword.data) {
      const result = await credentialPassword.refetch();

      if (result.isError) {
        return;
      }
    }

    setShowPassword(true);
  }

  async function handleCopyPassword() {
    if (!credentialPassword.data) {
      return;
    }

    await navigator.clipboard.writeText(credentialPassword.data);

    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  function handleDelete() {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta credencial? Esta ação não pode ser desfeita.",
    );

    if (!confirmed) {
      return;
    }

    deleteCredential.mutate(credentialId, {
      onSuccess: () => {
        navigate("/dashboard");
      },
    });
  }

  if (credential.isPending) {
    return (
      <div className="min-h-screen bg-ink">
        <PublicHeader />

        <main className="mx-auto max-w-5xl px-6 py-12">
          <div className="h-4 w-24 animate-pulse bg-surface" />

          <div className="mt-8 space-y-6">
            <div className="h-8 w-64 animate-pulse bg-surface" />
            <div className="h-4 w-96 animate-pulse bg-surface" />
          </div>
        </main>
      </div>
    );
  }

  if (credential.isError || !credential.data) {
    return (
      <div className="min-h-screen bg-ink">
        <PublicHeader />

        <main className="mx-auto max-w-5xl px-6 py-12">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            Voltar
          </Link>

          <div className="mt-16">
            <p className="font-mono text-xs text-danger">ERROR</p>

            <h1 className="mt-3 text-2xl font-medium text-text">
              Credencial não encontrada
            </h1>

            <p className="mt-3 max-w-md text-sm leading-6 text-muted">
              Não foi possível carregar a credencial solicitada.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const currentCredential = credential.data;

  return (
    <div className="min-h-screen bg-ink">
      <PublicHeader />

      <main className="mx-auto max-w-5xl px-6 py-10">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Voltar para credenciais
        </Link>

        <header className="mt-10 border-b border-line pb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            credencial
          </p>

          <h1 className="mt-3 text-3xl font-medium text-text">
            {currentCredential.platformName}
          </h1>

          <p className="mt-2 font-mono text-sm text-muted">
            {currentCredential.login}
          </p>
        </header>

        <section>
          <EditableCredentialField
            label="Plataforma"
            editing={editing === "platformName"}
            onEdit={() => startEditing("platformName")}
            onCancel={cancelEditing}
            value={
              <span className="text-sm text-text">
                {currentCredential.platformName}
              </span>
            }
          >
            <form
              onSubmit={(event) => {
                event.preventDefault();

                updatePlatformName.mutate(
                  {
                    credentialId,
                    platformName,
                  },
                  {
                    onSuccess: () => {
                      setEditing(null);
                    },
                  },
                );
              }}
              className="space-y-4"
            >
              <Input
                id="platform-name"
                label="Plataforma"
                value={platformName}
                onChange={(event) => setPlatformName(event.target.value)}
                autoFocus
              />

              {updatePlatformName.isError && (
                <FormError>
                  {updatePlatformName.error.response?.data ??
                    "Não foi possível atualizar a plataforma."}
                </FormError>
              )}

              <Button type="submit" disabled={updatePlatformName.isPending}>
                {updatePlatformName.isPending ? "Salvando..." : "Salvar"}
              </Button>
            </form>
          </EditableCredentialField>

          <EditableCredentialField
            label="Login"
            editing={editing === "login"}
            onEdit={() => startEditing("login")}
            onCancel={cancelEditing}
            value={
              <span className="font-mono text-sm text-text">
                {currentCredential.login}
              </span>
            }
          >
            <form
              onSubmit={(event) => {
                event.preventDefault();

                updateLogin.mutate(
                  {
                    credentialId,
                    login,
                  },
                  {
                    onSuccess: () => {
                      setEditing(null);
                    },
                  },
                );
              }}
              className="space-y-4"
            >
              <Input
                id="credential-login"
                label="Login"
                value={login}
                onChange={(event) => setLogin(event.target.value)}
                autoFocus
              />

              {updateLogin.isError && (
                <FormError>
                  {updateLogin.error.response?.data ??
                    "Não foi possível atualizar o login."}
                </FormError>
              )}

              <Button type="submit" disabled={updateLogin.isPending}>
                {updateLogin.isPending ? "Salvando..." : "Salvar"}
              </Button>
            </form>
          </EditableCredentialField>

          <EditableCredentialField
            label="E-mail"
            editing={editing === "email"}
            onEdit={() => startEditing("email")}
            onCancel={cancelEditing}
            value={
              <span className="font-mono text-sm text-text">
                {currentCredential.email || "Nenhum e-mail associado"}
              </span>
            }
          >
            <form
              onSubmit={(event) => {
                event.preventDefault();

                updateEmail.mutate(
                  {
                    credentialId,
                    email,
                  },
                  {
                    onSuccess: () => {
                      setEditing(null);
                    },
                  },
                );
              }}
              className="space-y-4"
            >
              <Input
                id="credential-email"
                label="E-mail"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoFocus
              />

              {updateEmail.isError && (
                <FormError>
                  {updateEmail.error.response?.data ??
                    "Não foi possível atualizar o e-mail."}
                </FormError>
              )}

              <Button type="submit" disabled={updateEmail.isPending}>
                {updateEmail.isPending ? "Salvando..." : "Salvar"}
              </Button>
            </form>
          </EditableCredentialField>

          <EditableCredentialField
            label="Senha"
            editing={editing === "password"}
            onEdit={() => startEditing("password")}
            onCancel={cancelEditing}
            value={
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-text">
                  {showPassword && credentialPassword.data
                    ? credentialPassword.data
                    : "••••••••••••"}
                </span>

                <button
                  type="button"
                  onClick={handleShowPassword}
                  className="cursor-pointer text-muted transition-colors hover:text-text"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <EyeOff size={16} strokeWidth={1.5} />
                  ) : (
                    <Eye size={16} strokeWidth={1.5} />
                  )}
                </button>

                {showPassword && credentialPassword.data && (
                  <button
                    type="button"
                    onClick={handleCopyPassword}
                    className="cursor-pointer text-muted transition-colors hover:text-text"
                    aria-label="Copiar senha"
                  >
                    <Copy size={16} strokeWidth={1.5} />
                  </button>
                )}

                {copied && (
                  <span className="font-mono text-xs text-signal">Copiado</span>
                )}

                {credentialPassword.isError && (
                  <FormError>Não foi possível carregar a senha.</FormError>
                )}
              </div>
            }
          >
            <form
              onSubmit={(event) => {
                event.preventDefault();

                updatePassword.mutate(
                  {
                    credentialId,
                    password,
                  },
                  {
                    onSuccess: () => {
                      setPassword("");
                      setShowPassword(false);
                      setEditing(null);
                    },
                  },
                );
              }}
              className="space-y-4"
            >
              <Input
                id="new-credential-password"
                label="Nova senha"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="font-mono"
                autoFocus
              />

              {updatePassword.isError && (
                <FormError>
                  {updatePassword.error.response?.data ??
                    "Não foi possível atualizar a senha."}
                </FormError>
              )}

              <Button type="submit" disabled={updatePassword.isPending}>
                {updatePassword.isPending ? "Salvando..." : "Salvar"}
              </Button>
            </form>
          </EditableCredentialField>

          <EditableCredentialField
            label="Link"
            editing={editing === "link"}
            onEdit={() => startEditing("link")}
            onCancel={cancelEditing}
            value={
              currentCredential.link ? (
                <div className="flex items-center gap-3">
                  <span className="min-w-0 truncate font-mono text-sm text-text">
                    {currentCredential.link}
                  </span>

                  <a
                    href={currentCredential.link}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 text-muted transition-colors hover:text-brass"
                    aria-label="Abrir link"
                  >
                    <ExternalLink size={16} strokeWidth={1.5} />
                  </a>
                </div>
              ) : (
                <span className="text-sm text-muted">
                  Nenhum link associado
                </span>
              )
            }
          >
            <form
              onSubmit={(event) => {
                event.preventDefault();

                updateLink.mutate(
                  {
                    credentialId,
                    link,
                  },
                  {
                    onSuccess: () => {
                      setEditing(null);
                    },
                  },
                );
              }}
              className="space-y-4"
            >
              <Input
                id="credential-link"
                label="Link"
                type="url"
                value={link}
                onChange={(event) => setLink(event.target.value)}
                autoFocus
              />

              {updateLink.isError && (
                <FormError>
                  {updateLink.error.response?.data ??
                    "Não foi possível atualizar o link."}
                </FormError>
              )}

              <Button type="submit" disabled={updateLink.isPending}>
                {updateLink.isPending ? "Salvando..." : "Salvar"}
              </Button>
            </form>
          </EditableCredentialField>

          <EditableCredentialField
            label="Descrição"
            editing={editing === "description"}
            onEdit={() => startEditing("description")}
            onCancel={cancelEditing}
            value={
              <p className="max-w-2xl whitespace-pre-wrap text-sm leading-6 text-text">
                {currentCredential.description || "Nenhuma descrição"}
              </p>
            }
          >
            <form
              onSubmit={(event) => {
                event.preventDefault();

                updateDescription.mutate(
                  {
                    credentialId,
                    description,
                  },
                  {
                    onSuccess: () => {
                      setEditing(null);
                    },
                  },
                );
              }}
              className="space-y-4"
            >
              <div className="border-b border-line pb-2 transition-colors focus-within:border-brass">
                <label
                  htmlFor="credential-description"
                  className="block text-xs text-muted"
                >
                  Descrição
                </label>

                <textarea
                  id="credential-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="mt-1 min-h-24 w-full resize-y bg-transparent text-sm leading-6 text-text outline-none"
                  autoFocus
                />
              </div>

              {updateDescription.isError && (
                <FormError>
                  {updateDescription.error.response?.data ??
                    "Não foi possível atualizar a descrição."}
                </FormError>
              )}

              <Button type="submit" disabled={updateDescription.isPending}>
                {updateDescription.isPending ? "Salvando..." : "Salvar"}
              </Button>
            </form>
          </EditableCredentialField>
        </section>

        <section className="mt-16 border-t border-line pt-8">
          <p className="font-mono text-xs uppercase tracking-widest text-danger">
            zona de perigo
          </p>

          <div className="mt-5 flex items-center justify-between gap-6">
            <div>
              <h2 className="text-sm font-medium text-text">
                Excluir credencial
              </h2>

              <p className="mt-1 max-w-lg text-sm leading-6 text-muted">
                A credencial será removida permanentemente do seu cofre. Esta
                ação não pode ser desfeita.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteCredential.isPending}
              className="
                flex
                shrink-0
                items-center
                gap-2
                border
                border-danger
                px-4
                py-2.5
                text-sm
                text-danger
                transition-colors
                hover:bg-danger
                hover:text-ink
                disabled:opacity-50
                cursor-pointer
              "
            >
              <Trash2 size={16} strokeWidth={1.5} />

              {deleteCredential.isPending ? "Excluindo..." : "Excluir"}
            </button>
          </div>

          {deleteCredential.isError && (
            <div className="mt-4">
              <FormError>
                {deleteCredential.error.response?.data ??
                  "Não foi possível excluir a credencial."}
              </FormError>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
