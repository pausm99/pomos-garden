"use client";

import { actionCreateTag, actionGetAllTagsForUser } from "@/actions/tags";
import { Tag, TagCreateInputSchema } from "@/prisma/generated/zod";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { z } from "zod";
import { useToastContext } from "./ToastsContext";
import { useUserContext } from "./UserContext";

type TagCreateInput = z.infer<typeof TagCreateInputSchema>;

interface TagsContextProps {
  tagsCollection: Tag[];
  addTag: (tag: TagCreateInput) => Promise<Tag>;
}

const TagsContext = createContext<TagsContextProps | undefined>(undefined);

export const TagsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUserContext();
  const { addToast } = useToastContext();
  const [tagsCollection, setTagsCollection] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        if (user) {
          const fetchedTags = await actionGetAllTagsForUser(user!.id);
          setTagsCollection(fetchedTags);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
      }
    };

    fetchTags();
  }, [user]);

  const addTag = async (tag: TagCreateInput) => {
    console.log(tag)
    const newTag = await actionCreateTag(user!.id, tag.tagDesc, tag.color, []);
    addToast({
      description: "Tag created",
    });
    setTagsCollection((prevTags) => [...prevTags, newTag]);
    return newTag;
  };

  return (
    <TagsContext.Provider value={{ tagsCollection, addTag }}>
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
