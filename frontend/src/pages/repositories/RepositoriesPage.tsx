// src/features/repositories/RepositoriesPage.tsx
import { useState } from "react";
import {
  useRepositories,
  useConnectRepository,
  useAnalyzeRepository,
} from "@/hooks/queries/useRepositories";
import { useNotifications } from "@/hooks/common/useNotifications";
import { PageHeader } from "@/components/layouts/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { RepositoryGrid } from "@/components/features/repositories/RepositoryGrid";
import { ConnectRepositoryDialog } from "@/components/features/repositories/ConnectRepositoryDialog";
import { EmptyState } from "@/components/layouts/EmptyState";
import {
  GitBranch,
  Plus,
  Search,
  Filter,
  SortAsc,
  RefreshCw,
} from "lucide-react";
import { useDebounce } from "@/hooks/common/useDebounce";

export default function RepositoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 300);
  const { showNotification } = useNotifications();

  const {
    data: repositoriesData,
    isLoading,
    error,
    refetch,
  } = useRepositories({
    page: 1,
    limit: 20,
    status: statusFilter === "all" ? undefined : statusFilter,
  });

  const connectMutation = useConnectRepository();
  const analyzeMutation = useAnalyzeRepository();

  const handleConnect = async (githubUrl: string, branch?: string) => {
    connectMutation.mutate(
      { githubUrl, branch },
      {
        onSuccess: (data) => {
          setConnectDialogOpen(false);
          showNotification({
            type: "success",
            title: "Repository connected",
            message: `${data.name} has been connected successfully`,
          });
        },
        onError: (error) => {
          showNotification({
            type: "error",
            title: "Connection failed",
            message: error.message || "Failed to connect repository",
          });
        },
      }
    );
  };

  const handleAnalyze = (repositoryId: string) => {
    analyzeMutation.mutate(
      { repositoryId },
      {
        onSuccess: () => {
          showNotification({
            type: "success",
            title: "Analysis started",
            message: "Repository analysis has been queued",
          });
        },
        onError: (error) => {
          showNotification({
            type: "error",
            title: "Analysis failed",
            message: error.message || "Failed to start analysis",
          });
        },
      }
    );
  };

  const filteredRepositories =
    repositoriesData?.data?.filter((repo: any) => {
      if (debouncedSearch) {
        return (
          repo.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          repo.fullName.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
      }
      return true;
    }) || [];

  const sortedRepositories = [...filteredRepositories].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "date":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "status":
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Error loading repositories</h2>
        <p className="text-muted-foreground mb-4">
          Unable to load your repositories. Please try again.
        </p>
        <Button onClick={() => refetch()}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Repositories"
        description="Manage and analyze your GitHub repositories"
      >
        <Dialog open={connectDialogOpen} onOpenChange={setConnectDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Connect Repository
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Connect Repository</DialogTitle>
            </DialogHeader>
            <ConnectRepositoryDialog
              onConnect={handleConnect}
              isConnecting={connectMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="analyzing">Analyzing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date Added</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Repository Grid */}
      <RepositoryGrid
        repositories={sortedRepositories}
        onAnalyze={handleAnalyze}
        onConnect={() => setConnectDialogOpen(true)}
        isAnalyzing={
          analyzeMutation.isPending
            ? { [analyzeMutation.variables?.repositoryId || ""]: true }
            : {}
        }
        isLoading={isLoading}
      />

      {/* Stats */}
      {repositoriesData && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {sortedRepositories.length} of {repositoriesData.total}{" "}
          repositories
        </div>
      )}
    </div>
  );
}
