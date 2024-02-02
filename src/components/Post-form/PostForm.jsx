import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import storageService from "../../appwrite/storage_service";
import databaseService from "../../appwrite/database_service";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";

function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const submit = async (data) => {
    // condition if post available
    if (post) {
      // handling file
      const file = data.image[0]
        ? await storageService.uploadFile(data.image[0])
        : null;

      // image deletion
      if (file) {
        await storageService.deleteFile(post.featuredImage);
      }

      // updating post
      const dbPost = await databaseService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      // condition if post doesn't available

      //   upload image file
      const file = data.image[0]
        ? await storageService.uploadFile(data.image[0])
        : null;

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;

        // create new post
        const dbPost = await databaseService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  // slug transform
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [setValue, slugTransform, watch]);

  return (
    <form onSubmit={handleSubmit(submit)} className="sm:flex sm:flex-row">
      <div className="sm:w-2/3 px-2 ">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4 bg-transparent shadow-[0px_0px_1px]"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4 bg-transparent shadow-[0px_0px_1px]"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-full sm:w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={storageService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          
          className={`w-full bg-green-500 hover:bg-green-600 active:bg-teal-500`}
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
