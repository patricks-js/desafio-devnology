import { Filter, Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useProductFilters } from "../hooks/use-product-filters";

export function ProductFiltersToolbar() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const {
    searchTerm,
    selectedCategory,
    selectedDepartment,
    selectedMaterial,
    priceRange,
    setSearchTerm,
    setSelectedCategory,
    setSelectedDepartment,
    setSelectedMaterial,
    setPriceRange,
    clearFilter,
    availableFilters,
    isLoadingFilters,
  } = useProductFilters();

  const hasActiveFilters =
    selectedCategory ||
    selectedDepartment ||
    selectedMaterial ||
    priceRange.min !== 1 ||
    priceRange.max !== 1000;

  const clearAllFilters = () => clearFilter();

  return (
    <div className="sticky top-16 z-40 border-b bg-white">
      <div className="mx-auto max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <div className="relative max-w-md flex-1">
            <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pr-4 pl-10"
              disabled={isLoadingFilters}
            />
          </div>

          <Button
            variant="outline"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
            {hasActiveFilters && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white text-xs">
                !
              </span>
            )}
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="mr-1 h-4 w-4" />
              Limpar
            </Button>
          )}
        </div>

        <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <CollapsibleContent className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filtrar Produtos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {/* Category Filter */}
                  <div className="space-y-2">
                    <Label>Categoria</Label>
                    <Select
                      value={selectedCategory || ""}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="w-56">
                        <SelectValue placeholder="Todas as categorias" />
                      </SelectTrigger>
                      <SelectContent className="w-56">
                        <ScrollArea className="h-64">
                          {availableFilters?.categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Department Filter */}
                  <div className="space-y-2">
                    <Label>Departamento</Label>
                    <Select
                      value={selectedDepartment || ""}
                      onValueChange={setSelectedDepartment}
                    >
                      <SelectTrigger className="w-56">
                        <SelectValue placeholder="Todos os departamentos" />
                      </SelectTrigger>
                      <SelectContent className="w-56">
                        <ScrollArea className="h-64">
                          {availableFilters?.departments.map((department) => (
                            <SelectItem key={department} value={department}>
                              {department}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Material Filter */}
                  <div className="space-y-2">
                    <Label>Material</Label>
                    <Select
                      value={selectedMaterial || ""}
                      onValueChange={setSelectedMaterial}
                    >
                      <SelectTrigger className="w-56">
                        <SelectValue placeholder="Todos os materiais" />
                      </SelectTrigger>
                      <SelectContent className="w-56">
                        <ScrollArea className="h-64">
                          {availableFilters?.materials.map((material) => (
                            <SelectItem key={material} value={material}>
                              {material}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Filter */}
                  <div className="space-y-2">
                    <Label>Preço (R$)</Label>
                    <div className="flex flex-col gap-2">
                      <Slider
                        min={1}
                        max={1000}
                        step={10}
                        value={[priceRange.min, priceRange.max]}
                        onValueChange={(values: number[]) =>
                          setPriceRange({
                            min: values[0],
                            max: values[1],
                          })
                        }
                        className="w-56"
                      />
                      <div className="flex justify-between text-muted-foreground text-xs">
                        <span>Mín: R$ {priceRange.min}</span>
                        <span>Máx: R$ {priceRange.max}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
