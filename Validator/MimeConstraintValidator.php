<?php

namespace Akyos\FileManagerBundle\Validator;

use Akyos\FileManagerBundle\Entity\File;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

/**
 * Class MimeConstraintValidator
 * @package Akyos\FileManagerBundle\Validator
 */
class MimeConstraintValidator extends ConstraintValidator
{
    private EntityManagerInterface $em;

    private KernelInterface $kernel;

    public function __construct(EntityManagerInterface $em, KernelInterface $kernel)
    {
        $this->em = $em;
        $this->kernel = $kernel;
    }

    /**
     * @param mixed $value
     * @param Constraint $constraint
     */
    public function validate($value, Constraint $constraint)
    {
        /** FileManagerCollectionType */
        if (is_array($value)) {
            foreach ($value as $i) {
                $this->findFile($i, $constraint);
            }
        } /** FileManagerType */ elseif (is_string($value)) {
            $this->findFile($value, $constraint);
        }
    }

    /**
     * @param $id
     * @param Constraint $constraint
     */
    public function findFile($id, Constraint $constraint)
    {
        $file = $this->em->getRepository(File::class)->find($id);
        if ($file) {
            if (file_exists($this->kernel->getProjectDir() . '/public' . $file->getFile())) {
                $mime = mime_content_type($this->kernel->getProjectDir() . '/public' . $file->getFile());
            } elseif (file_exists($this->kernel->getProjectDir() . $file->getFile())) {
                $mime = mime_content_type($this->kernel->getProjectDir() . $file->getFile());
            } else {
                $mime = false;
            }

            if ($mime && !in_array($mime, $constraint->types, true)) {
                $this->context->buildViolation($constraint->message)->setParameter('{{ value }}', $file->getName())->setParameter('{{ types }}', implode(',', $constraint->types))->addViolation();
            }
            if (!$mime) {
                $this->context->buildViolation($constraint->message)->setParameter('{{ value }}', $file->getName())->setParameter('{{ types }}', implode(',', $constraint->types))->addViolation();
            }
        } else {
            $this->context->buildViolation($constraint->message)->setParameter('{{ value }}', $file->getName())->setParameter('{{ types }}', implode(',', $constraint->types))->addViolation();
        }
    }
}
