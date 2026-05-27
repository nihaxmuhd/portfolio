import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash2, Upload } from "lucide-react";

export default function AdminResume({
  isAdmin,
}) {
  const [file, setFile] =
    useState(null);

  const [
    resume,
    setResume,
  ] = useState(null);

  const [loading, setLoading] =
    useState(false);

  if (!isAdmin)
    return null;

  const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://portfolio-xof8.onrender.com";

  const fetchResume =
    async () => {
      try {
        const res =
          await fetch(
            `${BASE_URL}/api/resume/`
          );

        const data =
          await res.json();

        if (
          Array.isArray(
            data
          ) &&
          data.length > 0
        ) {
          setResume(
            data[0]
          );
        } else {
          setResume(
            null
          );
        }
      } catch (err) {
        console.error(
          err
        );
      }
    };

  useEffect(() => {
    fetchResume();
  }, []);

  const handleUpload =
    async () => {
      if (!file) {
        toast.error(
          "Please select a resume file"
        );
        return;
      }

      try {
        setLoading(
          true
        );

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        const response =
          await fetch(
            `${BASE_URL}/api/resume/`,
            {
              method:
                "POST",

              headers: {
                Authorization: `Token ${localStorage.getItem(
                  "authToken"
                )}`,
              },

              body:
                formData,
            }
          );

        if (
          !response.ok
        ) {
          throw new Error(
            "Upload failed"
          );
        }

        const data =
          await response.json();

        setResume(
          data
        );

        setFile(
          null
        );

        toast.success(
          "Resume uploaded successfully"
        );

        await fetchResume();

        window.location.reload();
      } catch (err) {
        console.error(
          err
        );

        toast.error(
          "Resume upload failed"
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  const handleDelete =
    async () => {
      if (
        !resume?.id
      )
        return;

      try {
        setLoading(
          true
        );

        const response =
          await fetch(
            `${BASE_URL}/api/resume/${resume.id}/`,
            {
              method:
                "DELETE",

              headers: {
                Authorization: `Token ${localStorage.getItem(
                  "authToken"
                )}`,
              },
            }
          );

        if (
          !response.ok
        ) {
          throw new Error(
            "Delete failed"
          );
        }

        setResume(
          null
        );

        toast.success(
          "Resume deleted successfully"
        );

        window.location.reload();
      } catch (err) {
        console.error(
          err
        );

        toast.error(
          "Delete failed"
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  return (
    <section className="container py-12">
      <div className="glass-card rounded-[2rem] border border-slate-300/40 p-8 shadow-xl dark:border-white/10">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Resume Management
          </h2>

          {resume && (
            <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-600">
              Resume Available
            </span>
          )}
        </div>

        {/* CURRENT RESUME */}
        {resume?.file && (
          <div className="mb-6 rounded-2xl border border-slate-200 p-5 dark:border-white/10">
            <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
              Current Resume
            </p>

            <div className="flex flex-wrap items-center gap-3">

              <a
                href={
                  resume.file
                }
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:scale-[1.02]"
              >
                View Resume
              </a>

              <button
                onClick={
                  handleDelete
                }
                disabled={
                  loading
                }
                className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-medium text-white transition hover:scale-[1.02]"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        )}

        {/* UPLOAD */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={e =>
              setFile(
                e.target
                  .files[0]
              )
            }
            className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm dark:border-white/10 dark:bg-slate-900"
          />

          <button
            onClick={
              handleUpload
            }
            disabled={
              loading
            }
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:opacity-50"
          >
            <Upload className="h-4 w-4" />

            {loading
              ? "Uploading..."
              : "Upload Resume"}
          </button>
        </div>
      </div>
    </section>
  );
}