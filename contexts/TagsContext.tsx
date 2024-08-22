"use client";

import { actionCreateTag, actionGetAllTagsForUser } from "@/actions/tags";
import { Tag } from "@/prisma/generated/zod";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

interface TagsContextProps {
  tagsCollection: Tag[];
  addTag: (tag: Tag) => void;
//   updateTag: (updatedTag: Tag) => void;
//   deleteTag: (tagId: string) => void;
}

const TagsContext = createContext<TagsContextProps | undefined>(undefined);

export const TagsProvider = ({ children }: { children: ReactNode }) => {
  const [tagsCollection, setTagsCollection] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const fetchedTags = await actionGetAllTagsForUser(
          "66c60077cfa9f183ca355e23"
        );
        setTagsCollection(fetchedTags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  const addTag = async (tag: {
    title: string;
    description: string;
    userId: string;
    color: string;
    taskId: string[]
  }) => {
    const newTag = await actionCreateTag("", tag.description, tag.color, tag.taskId);
    setTagsCollection((prevTags) => [...prevTags, newTag]);
  };

  const updateTag = async (updatedTag: Tag) => {
    // const tag = await actionUpdateTag(updatedTag);
    // setTagsCollection((prevTags) =>
    //   prevTags.map((prevTag) => (prevTag.id === tag.id ? tag : prevTag))
    // );
  };

  const deleteTag = async (tagId: string) => {
    // await actionDeleteTag(tagId)
    // setTagsCollection((prevTags) =>
    //   prevTags.filter((tag) => tag.id !== tagId)
    // );
  };

  return (
    <TagsContext.Provider
      value={{ tagsCollection, addTag }}
    >
      {children}
    </TagsContext.Provider>
  );
};

export const useTagsContext = () => {
  const context = useContext(TagsContext);
  if (context === undefined) {
    throw new Error("useTagsContext must be used within a TagsProvider");
  }
  return context;
};

export default TagsContext;
