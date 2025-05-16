import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-tasks.dto';
import { ChangeTaskDto } from './dtos/change-tasks.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
      },
    });
  }

  async getTaskById(id: number): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task not found`);
    }
    return task;
  }

  async changeTask(id: number, dto: ChangeTaskDto): Promise<Task | null> {
    await this.getTaskById(id);

    return this.prisma.task.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
      },
    });
  }

  async completeTask(id: number): Promise<Task | null> {
    await this.getTaskById(id);

    return this.prisma.task.update({
      where: { id },
      data: { completed: true },
    });
  }

  async uncompleteTask(id: number): Promise<Task | null> {
    await this.getTaskById(id);

    return this.prisma.task.update({
      where: { id },
      data: { completed: false },
    });
  }

  async deleteTask(id: number): Promise<Task | null> {
    await this.getTaskById(id);

    return this.prisma.task.delete({ where: { id } });
  }
}
