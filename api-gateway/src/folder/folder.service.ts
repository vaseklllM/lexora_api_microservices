import { Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { CreateFolderResponseDto } from './dto/create-folder-response.dto';
import { RenameFolderDto } from './dto/rename-folder.dto';
import { RenameFolderResponseDto } from './dto/rename-folder-response.dto';
import { DeleteFolderDto } from './dto/delete-folder.dto';
import { DeleteFolderResponseDto } from './dto/delete-folder-response.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { FolderResponseDto } from './dto/folder-response.dto';

@Injectable()
export class FolderService {
  constructor(private readonly httpService: HttpService) {}

  async create(
    accessToken: string,
    createFolderDto: CreateFolderDto,
  ): Promise<CreateFolderResponseDto> {
    const response = await firstValueFrom(
      this.httpService.post('folder/create', createFolderDto, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );

    return response.data;
  }

  async rename(
    accessToken: string,
    renameFolderDto: RenameFolderDto,
  ): Promise<RenameFolderResponseDto> {
    const response = await firstValueFrom(
      this.httpService.patch('folder/rename', renameFolderDto, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );

    return response.data;
  }

  async delete(
    accessToken: string,
    deleteFolderDto: DeleteFolderDto,
  ): Promise<DeleteFolderResponseDto> {
    const response = await firstValueFrom(
      this.httpService.delete('folder/delete', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: deleteFolderDto,
      }),
    );

    return response.data;
  }

  async getFolder(
    accessToken: string,
    folderId: string,
  ): Promise<FolderResponseDto> {
    const response = await firstValueFrom(
      this.httpService.get(`folder/${folderId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );

    return response.data;
  }
}
