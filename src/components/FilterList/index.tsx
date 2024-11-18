import { Flex, Text } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import { ArchiveIcon, HomeIcon } from "@radix-ui/react-icons";
import { ListContext } from "../../ListContext";
import { useContext } from "react";

export const FilterList = () => {
  const { filter, setFilter } = useContext(ListContext) || {};
  return (
    <Flex gap="4" direction="column">
      <Button
        className="listItem"
        variant={filter === "all" ? "soft" : "ghost"}
        onClick={() => setFilter("all")}
      >
        <Flex justify="start" align="center" gap="2" width="100%">
          <HomeIcon width="20px" height="20px" />
          <Text size="3" weight="bold">
            All Notes
          </Text>
        </Flex>
      </Button>
      <Button
        className="listItem"
        variant={filter === "archived" ? "soft" : "ghost"}
        onClick={() => setFilter("archived")}
      >
        <Flex justify="start" align="center" gap="2" width="100%">
          <ArchiveIcon width="20px" height="20px" />
          <Text size="3" weight="bold">
            Archived Notes
          </Text>
        </Flex>
      </Button>
    </Flex>
  );
};
