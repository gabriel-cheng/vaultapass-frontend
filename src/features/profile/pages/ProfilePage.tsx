import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../../components/ui/Button";
import { FormError } from "../../../components/ui/FormError";
import { Input } from "../../../components/ui/Input";
import { EditableField } from "../../../components/ui/EditableField";

import { useCurrentUser } from "../../auth/api/useCurrentUser";

import { useUpdateName } from "../api/useUpdateName";
import { useUpdateLastname } from "../api/useUpdateLastname";
import { useUpdateUsername } from "../api/useUpdateUsername";
import { useUpdateEmail } from "../api/useUpdateEmail";
import { useUpdatePassword } from "../api/useUpdatePassword";
import { useUpdateProfilePhoto } from "../api/useUpdateProfilePhoto";

type EditableSection =
  | "name"
  | "lastname"
  | "username"
  | "email"
  | "password"
  | null;

export function ProfilePage() {
  const navigate = useNavigate();

  const currentUser = useCurrentUser();

  const updateName = useUpdateName();
  const updateLastname = useUpdateLastname();
  const updateUsername = useUpdateUsername();
  const updateEmail = useUpdateEmail();
  const updatePassword = useUpdatePassword();
  const updateProfilePhoto = useUpdateProfilePhoto();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editing, setEditing] = useState<EditableSection>(null);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [emailCurrentPassword, setEmailCurrentPassword] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [photoError, setPhotoError] = useState<string | null>(null);

  if (currentUser.isPending) {
    return null;
  }

  if (currentUser.isError || !currentUser.data) {
    navigate("/login", { replace: true });

    return null;
  }

  const user = currentUser.data;

  function startEditing(section: EditableSection) {
    if (section === "name") {
      setName(user.name);
    }

    if (section === "lastname") {
      setLastname(user.lastname);
    }

    if (section === "username") {
      setUsername(user.username);
    }

    if (section === "email") {
      setEmail(user.email);
      setEmailCurrentPassword("");
    }

    if (section === "password") {
      setCurrentPassword("");
      setNewPassword("");
    }

    setEditing(section);
  }

  function cancelEditing() {
    setEditing(null);

    setName("");
    setLastname("");
    setUsername("");
    setEmail("");
    setEmailCurrentPassword("");
    setCurrentPassword("");
    setNewPassword("");

    updateName.reset();
    updateLastname.reset();
    updateUsername.reset();
    updateEmail.reset();
    updatePassword.reset();
  }

  function handleUpdateName(event: React.FormEvent) {
    event.preventDefault();

    updateName.mutate(
      { name },
      {
        onSuccess: () => {
          setEditing(null);
        },
      },
    );
  }

  function handleUpdateLastname(event: React.FormEvent) {
    event.preventDefault();

    updateLastname.mutate(
      { lastname },
      {
        onSuccess: () => {
          setEditing(null);
        },
      },
    );
  }

  function handleUpdateUsername(event: React.FormEvent) {
    event.preventDefault();

    updateUsername.mutate(
      { username },
      {
        onSuccess: () => {
          setEditing(null);
        },
      },
    );
  }

  function handleUpdateEmail(event: React.FormEvent) {
    event.preventDefault();

    updateEmail.mutate(
      {
        email,
        currentPassword: emailCurrentPassword,
      },
      {
        onSuccess: () => {
          setEditing(null);
        },
      },
    );
  }

  function handleUpdatePassword(event: React.FormEvent) {
    event.preventDefault();

    updatePassword.mutate(
      {
        currentPassword,
        newPassword,
      },
      {
        onSuccess: () => {
          setEditing(null);
          setCurrentPassword("");
          setNewPassword("");
        },
      },
    );
  }

  function handleSelectPhoto() {
    setPhotoError(null);
    fileInputRef.current?.click();
  }

  function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setPhotoError("A foto deve estar no formato JPEG, PNG ou WebP.");

      event.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      setPhotoError("A foto deve ter no máximo 5 MB.");

      event.target.value = "";
      return;
    }

    setPhotoError(null);

    updateProfilePhoto.mutate(file);

    event.target.value = "";
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="mb-10">
        <h1 className="text-2xl font-medium text-text">Meu perfil</h1>

        <p className="mt-2 text-sm text-muted">
          Gerencie seus dados e configurações de acesso.
        </p>
      </header>

      <section>
        <h2 className="border-t border-line pt-5 font-mono text-xs uppercase tracking-widest text-muted">
          Foto de perfil
        </h2>

        <div className="flex items-center gap-5 border-b border-line py-6">
          <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line text-muted">
            {user.profilePhotoUrl ? (
              <img
                src={user.profilePhotoUrl}
                alt=""
                className="size-full object-cover"
              />
            ) : (
              <span className="font-mono text-sm">
                {user.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={handleSelectPhoto}
              disabled={updateProfilePhoto.isPending}
              className="cursor-pointer text-sm text-muted transition-colors hover:text-brass disabled:opacity-50"
            >
              {updateProfilePhoto.isPending ? "Enviando..." : "Trocar foto"}
            </button>

            <p className="mt-1 text-xs text-muted">
              JPEG, PNG ou WebP. Máximo de 5 MB.
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>

        {photoError && (
          <div className="pt-3">
            <FormError>{photoError}</FormError>
          </div>
        )}

        {updateProfilePhoto.isError && (
          <div className="pt-3">
            <FormError>Não foi possível atualizar a foto.</FormError>
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="border-t border-line pt-5 font-mono text-xs uppercase tracking-widest text-muted">
          Informações
        </h2>

        <EditableField
          label="Nome"
          value={user.name}
          editing={editing === "name"}
          onEdit={() => startEditing("name")}
          onCancel={cancelEditing}
        >
          <form onSubmit={handleUpdateName} className="space-y-4">
            <Input
              id="profile-name"
              label="Nome"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />

            {updateName.isError && (
              <FormError>Não foi possível atualizar o nome.</FormError>
            )}

            <Button type="submit" disabled={updateName.isPending}>
              {updateName.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </form>
        </EditableField>

        <EditableField
          label="Sobrenome"
          value={user.lastname}
          editing={editing === "lastname"}
          onEdit={() => startEditing("lastname")}
          onCancel={cancelEditing}
        >
          <form onSubmit={handleUpdateLastname} className="space-y-4">
            <Input
              id="profile-lastname"
              label="Sobrenome"
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
              required
            />

            {updateLastname.isError && (
              <FormError>Não foi possível atualizar o sobrenome.</FormError>
            )}

            <Button type="submit" disabled={updateLastname.isPending}>
              {updateLastname.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </form>
        </EditableField>

        <EditableField
          label="Username"
          value={<span className="font-mono">@{user.username}</span>}
          editing={editing === "username"}
          onEdit={() => startEditing("username")}
          onCancel={cancelEditing}
        >
          <form onSubmit={handleUpdateUsername} className="space-y-4">
            <Input
              id="profile-username"
              label="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="font-mono"
              required
            />

            <p className="text-xs leading-5 text-muted">
              Alterar o nome de usuário encerrará sua sessão em outros
              dispositivos.
            </p>

            {updateUsername.isError && (
              <FormError>
                Não foi possível atualizar o nome de usuário.
              </FormError>
            )}

            <Button type="submit" disabled={updateUsername.isPending}>
              {updateUsername.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </form>
        </EditableField>
      </section>

      <section className="mt-10">
        <h2 className="border-t border-line pt-5 font-mono text-xs uppercase tracking-widest text-muted">
          Email
        </h2>

        <EditableField
          label="Email"
          value={user.email}
          editing={editing === "email"}
          onEdit={() => startEditing("email")}
          onCancel={cancelEditing}
        >
          <form onSubmit={handleUpdateEmail} className="space-y-4">
            <Input
              id="profile-email-current-password"
              label="Senha atual"
              type="password"
              value={emailCurrentPassword}
              onChange={(event) => setEmailCurrentPassword(event.target.value)}
              className="font-mono"
              required
            />

            <Input
              id="profile-email"
              label="Novo email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            {updateEmail.isError && (
              <FormError>
                {typeof updateEmail.error.response?.data === "string"
                  ? updateEmail.error.response.data
                  : "Não foi possível atualizar o email."}
              </FormError>
            )}

            <Button type="submit" disabled={updateEmail.isPending}>
              {updateEmail.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </form>
        </EditableField>
      </section>

      <section className="mt-10">
        <h2 className="border-t border-line pt-5 font-mono text-xs uppercase tracking-widest text-muted">
          Senha
        </h2>

        <EditableField
          label="Senha"
          value={<span className="font-mono">••••••••••••</span>}
          editing={editing === "password"}
          onEdit={() => startEditing("password")}
          onCancel={cancelEditing}
        >
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <Input
              id="profile-current-password"
              label="Senha atual"
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className="font-mono"
              required
            />

            <Input
              id="profile-new-password"
              label="Nova senha"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="font-mono"
              required
            />

            <p className="text-xs leading-5 text-muted">
              Alterar sua senha encerrará sua sessão em outros dispositivos.
            </p>

            {updatePassword.isError && (
              <FormError>
                {typeof updatePassword.error.response?.data === "string"
                  ? updatePassword.error.response.data
                  : "Não foi possível atualizar a senha."}
              </FormError>
            )}

            <Button type="submit" disabled={updatePassword.isPending}>
              {updatePassword.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </form>
        </EditableField>
      </section>

      <section className="mt-10">
        <h2 className="border-t border-line pt-5 font-mono text-xs uppercase tracking-widest text-danger">
          Zona de perigo
        </h2>

        <div className="flex items-center justify-between gap-6 border-b border-line py-5">
          <div>
            <p className="text-sm text-text">Excluir conta</p>

            <p className="mt-1 text-xs text-muted">
              Esta ação não poderá ser desfeita.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              window.confirm("Tem certeza que deseja excluir sua conta?");
            }}
            className="shrink-0 text-sm text-danger transition-colors hover:brightness-110"
          >
            Excluir conta
          </button>
        </div>
      </section>
    </main>
  );
}
