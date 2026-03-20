import { useEffect, useState } from "react";
import { usePortfolio } from "../features/portfolio/hooks/usePortfolio";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiPlus, 
  FiTrash2, 
  FiEdit2, 
  FiX, 
  FiImage, 
  FiGithub, 
  FiExternalLink,
  FiCheckCircle,
  FiAlertCircle,
  FiSave,
  FiFolder
} from "react-icons/fi";

const AdminProjects = () => {
  const {
    projects,
    handleGetAllProjects,
    handleCreateProject,
    handleUpdateProject,
    handleDeleteProject
  } = usePortfolio();

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "fullstack",
    techStack: "",
    githubLinks: "",
    deployedLinks: "",
    description: "",
    featured: false,
    status: "completed",
    thumbnail: null,
    gallery: []
  });
  
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (projects.length === 0) {
      handleGetAllProjects();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      if (name === "thumbnail") {
        const file = files[0];
        setForm(prev => ({ ...prev, thumbnail: file }));
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setThumbnailPreview(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          setThumbnailPreview(null);
        }
      }

      if (name === "gallery") {
        const filesArray = Array.from(files);
        setForm(prev => ({ ...prev, gallery: filesArray }));
        
        const previews = [];
        filesArray.forEach(file => {
          const reader = new FileReader();
          reader.onloadend = () => {
            previews.push(reader.result);
            if (previews.length === filesArray.length) {
              setGalleryPreviews(previews);
            }
          };
          reader.readAsDataURL(file);
        });
      }
    } else {
      setForm(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  const removeThumbnail = () => {
    setForm(prev => ({ ...prev, thumbnail: null }));
    setThumbnailPreview(null);
    // Reset file input
    const fileInput = document.querySelector('input[name="thumbnail"]');
    if (fileInput) fileInput.value = '';
  };

  const removeGalleryImage = (index) => {
    const newGallery = Array.from(form.gallery);
    newGallery.splice(index, 1);
    setForm(prev => ({ ...prev, gallery: newGallery }));
    
    const newPreviews = [...galleryPreviews];
    newPreviews.splice(index, 1);
    setGalleryPreviews(newPreviews);
    
    // Reset file input
    const fileInput = document.querySelector('input[name="gallery"]');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      ...form,
      techStack: form.techStack.split(",").map(t => t.trim()).filter(t => t),
      githubLinks: form.githubLinks ? [form.githubLinks] : [],
      deployedLinks: form.deployedLinks ? [form.deployedLinks] : []
    };

    try {
      if (editingId) {
        await handleUpdateProject({ ...payload, projectId: editingId });
      } else {
        await handleCreateProject(payload);
      }
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      // Reset form
      setForm({
        name: "",
        category: "fullstack",
        techStack: "",
        githubLinks: "",
        deployedLinks: "",
        description: "",
        featured: false,
        status: "completed",
        thumbnail: null,
        gallery: []
      });
      setThumbnailPreview(null);
      setGalleryPreviews([]);
      setEditingId(null);
      handleGetAllProjects();
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    const tech = project.techStack || [];
    
    setForm({
      name: project.name,
      category: project.category,
      techStack: tech.join(", "),
      githubLinks: project.githubLinks?.[0] || "",
      deployedLinks: project.deployedLinks?.[0] || "",
      description: project.description,
      featured: project.featured,
      status: project.status,
      thumbnail: null,
      gallery: []
    });
    
    setThumbnailPreview(project.thumbnail);
    setGalleryPreviews(project.gallery || []);
    setEditingId(project._id);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
            Project Management
          </h1>
          <p className="text-neutral-400 text-lg">
            {editingId ? "Edit existing project" : "Create a new amazing project"}
          </p>
        </motion.div>

        {/* Success Toast */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
            >
              <FiCheckCircle />
              {editingId ? "Project updated successfully!" : "Project created successfully!"}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-800/30 backdrop-blur-sm border border-neutral-700 rounded-2xl p-8 mb-16"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Project Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter project name"
                required
                className="w-full p-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:border-sky-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full p-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:border-sky-500 focus:outline-none"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="fullstack">Fullstack</option>
                  <option value="system">System</option>
                  <option value="tool">Tool</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Status *
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full p-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:border-sky-500 focus:outline-none"
                >
                  <option value="completed">✅ Completed</option>
                  <option value="in-progress">🔄 In Progress</option>
                  <option value="planned">📋 Planned</option>
                </select>
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Tech Stack (comma separated) *
              </label>
              <input
                name="techStack"
                value={form.techStack}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB, TailwindCSS"
                required
                className="w-full p-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* GitHub Link */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  GitHub Link
                </label>
                <div className="relative">
                  <FiGithub className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                  <input
                    name="githubLinks"
                    value={form.githubLinks}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                    className="w-full pl-10 p-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Live Demo Link */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Live Demo Link
                </label>
                <div className="relative">
                  <FiExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                  <input
                    name="deployedLinks"
                    value={form.deployedLinks}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full pl-10 p-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your project..."
                rows="5"
                required
                className="w-full p-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:border-sky-500 focus:outline-none resize-none"
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Thumbnail Image *
              </label>
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <input
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full p-3 bg-neutral-900 border border-neutral-700 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-sky-600 file:text-white hover:file:bg-sky-700"
                  />
                </div>
                {thumbnailPreview && (
                  <div className="relative">
                    <img 
                      src={thumbnailPreview} 
                      alt="Thumbnail preview" 
                      className="w-20 h-20 object-cover rounded-lg border border-neutral-700"
                    />
                    <button
                      type="button"
                      onClick={removeThumbnail}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition"
                    >
                      <FiX className="w-3 h-3 text-white" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Gallery */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Gallery Images
              </label>
              <input
                type="file"
                name="gallery"
                multiple
                accept="image/*"
                onChange={handleChange}
                className="w-full p-3 bg-neutral-900 border border-neutral-700 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-sky-600 file:text-white hover:file:bg-sky-700"
              />
              
              {galleryPreviews.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {galleryPreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={preview} 
                        alt={`Gallery ${index + 1}`} 
                        className="w-full h-24 object-cover rounded-lg border border-neutral-700"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiX className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Featured Checkbox */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="w-5 h-5 text-sky-600 rounded focus:ring-sky-500"
              />
              <span className="text-neutral-300">⭐ Featured Project</span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-sky-600 to-purple-600 text-white rounded-lg font-semibold hover:from-sky-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FiSave />
              )}
              {editingId ? "Update Project" : "Create Project"}
            </button>
          </form>
        </motion.div>

        {/* Projects List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <FiFolder className="text-sky-400" />
            Existing Projects ({projects.length})
          </h2>
          
          <div className="space-y-4">
            {projects.map((project, index) => {
              const techStack = project.techStack || [];
              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group p-6 bg-neutral-800/30 backdrop-blur-sm border border-neutral-700 rounded-xl hover:border-sky-500/50 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {project.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {techStack.slice(0, 4).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs bg-sky-900/40 border border-sky-700 rounded text-sky-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {techStack.length > 4 && (
                          <span className="px-2 py-1 text-xs text-neutral-400">
                            +{techStack.length - 4}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-3 mt-3">
                        <span className={`text-xs px-2 py-1 rounded ${
                          project.status === 'completed' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                        }`}>
                          {project.status === 'completed' ? '✅ Completed' : '🔄 In Progress'}
                        </span>
                        {project.featured && (
                          <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/50 rounded">
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition"
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project._id)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminProjects;