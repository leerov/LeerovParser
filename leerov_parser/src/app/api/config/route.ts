import { IConfiguration } from "@/components/Interfaces/IConfiguration";
import { ConfigManager } from "@/utils/ConfigManager";
import { NextResponse } from "next/server";

async function handleRequest(
  action: () => Promise<any>,
  successMessage: string,
  statusCode = 200
) {
  try {
    await action();
    return NextResponse.json(
      { message: successMessage },
      { status: statusCode }
    );
  } catch (error: any) {
    console.error("Ошибка в API-роуте:", error); // Логирование ошибки
    return NextResponse.json(
      { error: error.message || "Произошла ошибка" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const body: IConfiguration = await request.json();
  const manager = new ConfigManager();
  return handleRequest(
    () => manager.addConfig(body),
    "Конфигурация успешно добавлена",
    201
  );
}

export async function GET() {
  try {
    const manager = new ConfigManager();
    const configs = await manager.getAllConfigs();
    return NextResponse.json({ configs }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Ошибка при получении конфигураций" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const body: IConfiguration = await request.json();
  const manager = new ConfigManager();
  return handleRequest(
    () => manager.updateConfig(body),
    "Конфигурация успешно обновлена"
  );
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get("id");
  const id = idParam ? Number(idParam) : NaN;

  if (!idParam || isNaN(id)) {
    return NextResponse.json(
      { error: "Необходимо передать корректный числовой параметр id" },
      { status: 400 }
    );
  }

  const manager = new ConfigManager();
  return handleRequest(
    () => manager.removeConfig(id),
    `Конфигурация с id ${id} успешно удалена`
  );
}
