import { useState, useEffect } from 'react';
import PNG_IMAGES from '@public/images/image';
import uploadIcon from '/icons/image-file.svg';

const FileInput = ({ props, watch, options }) => {
  const [imageSrc, setImageSrc] = useState(PNG_IMAGES.defaultProfile);
  const { name } = props;
  const File = watch(name);

  useEffect(() => {
    if (File) {
      if (File[0]) {
        const imagePreview = File[0];
        setImageSrc(URL.createObjectURL(imagePreview));
      }
    }
  }, [File]);

  return (
    <div className="flex flex-row gap-22 mb-24">
      {options.hasPreview && (
        <div className="w-79 h-79 rounded-full border-solid border-gray-7 border">
          <img
            src={imageSrc}
            className="object-cover w-79 h-79 rounded-full"
            alt="profile-image-preview"
          ></img>
        </div>
      )}

      <div className="flex flex-col gap-24">
        <div>
          <h3 className="text-14 font-semibold">{options.fileHeader}</h3>
          <p className="text-12 font-regular mt-3 text-gray-8 overflow-visible">
            {options.fileGuide}
          </p>
        </div>
        <div>
          <label
            htmlFor="file"
            className=" w-85 h-28 text-11 rounded-4 bg-primary-1 text-white hover:cursor-pointer flex items-center justify-center gap-3 box-shadow-2md"
          >
            <img src={uploadIcon} alt="Upload" className="w-16 h-14" />
            <span>{options.buttonLabel}</span>
          </label>
          <input {...props} name="image" accept="image/*" id="file" className="hidden" />
        </div>
      </div>
    </div>
  );
};

export default FileInput;
