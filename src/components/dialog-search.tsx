import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { PropsWithChildren, useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { searchChannels } from "@/shared/api/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  DotFilledIcon,
  MagnifyingGlassIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";

export function DialogInput({ children }: PropsWithChildren) {
  const navigate = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 450);

  const {
    data: searchResults,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["searchResults", debouncedSearchQuery],
    queryFn: async () => searchChannels(debouncedSearchQuery),
    enabled: !!debouncedSearchQuery,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (debouncedSearchQuery) {
      refetch();
    }
  }, [debouncedSearchQuery, refetch]);
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-auto rounded-xl max-w-lg border-[3px] border-card bg-black ">
        <DialogHeader className="">
          <DialogTitle className="flex items-center justify-center">
            Search streamer
            {isFetching && (
              <ReloadIcon className="ml-2  h-4 w-4 animate-spin" />
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="pt-3">
          <Input
            className="border-card focus:border-card active:border-card"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          ></Input>
        </div>
        {/* <DialogFooter> */}
        {searchResults?.map((channel) => (
          <div key={channel.display_name}>
            <div
              className="relative flex h-16 cursor-pointer list-none items-start rounded-lg pl-5 pt-3 text-secondary no-underline hover:bg-black/50 hover:bg-card hover:opacity-80"
              key={channel.id}
              onClick={() => navigate.push(`/streamer/${channel.id}`)}
            >
              <div className="flex items-center justify-center">
                <img
                  className="w-10 rounded-full"
                  src={channel.thumbnail_url}
                  alt=""
                />
                <span className="top[-20px] relative pl-5 text-white">
                  {channel.display_name}
                </span>
                {channel.is_live && (
                  <DotFilledIcon className="relative left-1 top-[2px] animate-pulse text-red-700"></DotFilledIcon>
                )}
              </div>
            </div>
          </div>
        ))}
        {/* </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
