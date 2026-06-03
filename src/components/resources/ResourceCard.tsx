"use client";

import { FileText, Download } from "lucide-react";
import type { Resource } from "@/types/resource";

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const downloadUrl = resource.driveFileId
    ? `https://drive.google.com/uc?export=download&id=${encodeURIComponent(resource.driveFileId)}`
    : resource.fileUrl;

  return (
    <div className="flex items-center gap-4 p-5 rounded-sm border border-warm-200 hover:bg-warm-100 hover:shadow-sm transition-all duration-200 group">
      {/* Icon */}
      <div className="flex-shrink-0">
        <FileText size={24} className="text-gold-400" strokeWidth={1.5} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-lg text-charcoal truncate">
          {resource.title}
        </h3>
        <p className="text-sm text-warm-500 mt-1 line-clamp-1">
          {resource.description}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs uppercase tracking-wide px-2 py-0.5 bg-warm-200 rounded text-warm-600">
            {resource.category}
          </span>
          <span className="text-xs text-warm-400">
            {resource.fileType.toUpperCase()} &middot; {resource.fileSize}
          </span>
        </div>
      </div>

      {/* Download button */}
      <a
        href={downloadUrl}
        download
        className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 border border-gold-400 text-gold-400 text-sm rounded-sm hover:bg-gold-400 hover:text-charcoal transition-all duration-200"
      >
        <Download size={16} />
        Download
      </a>
    </div>
  );
}
